import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2, Loader2, X, ImageIcon, FileText, ChevronDown } from "lucide-react";
import type { SiteContentItem } from "@/hooks/use-site-content";
import ImageUploader from "@/components/admin/ImageUploader";
import { toast } from "@/hooks/use-toast";

interface ContentResponse {
  rows: SiteContentItem[];
}

function parseImageArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

async function fetchContent(): Promise<ContentResponse> {
  const res = await fetch("/api/site-content", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load content");
  return res.json();
}

interface SettingsResponse {
  rows: { key: string; value: string }[];
}

async function fetchImageSettings(): Promise<SettingsResponse> {
  const res = await fetch("/api/site-settings", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load settings");
  return res.json();
}

const CATEGORIES = ["general", "home", "about", "contact", "projects", "sectors", "insights", "images", "navigation", "footer", "theme"];

interface ImageArrayCardProps {
  item: SiteContentItem;
  onSave: (key: string, images: string[]) => void;
  onDelete: (key: string) => void;
  isSaving: boolean;
}

function ImageArrayCard({ item, onSave, onDelete, isSaving }: ImageArrayCardProps) {
  const [images, setImages] = useState<string[]>(() => parseImageArray(item.value));
  const [dirty, setDirty] = useState(false);

  const updateAt = (index: number, url: string) => {
    setImages((prev) => prev.map((u, i) => (i === index ? url : u)));
    setDirty(true);
  };

  const removeAt = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setDirty(true);
  };

  const addImage = (url: string) => {
    setImages((prev) => [...prev, url]);
    setDirty(true);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-xs text-gray-600 truncate" title={item.key}>
          {item.key}
        </p>
        <button
          onClick={() => onDelete(item.key)}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
          title="Delete this entry"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((url, index) => (
          <div key={index} className="relative">
            <ImageUploader value={url} onChange={(newUrl) => updateAt(index, newUrl)} aspectClassName="aspect-square" />
            <button
              onClick={() => removeAt(index)}
              className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full shadow"
              title="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <ImageUploader value="" onChange={addImage} aspectClassName="aspect-square" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-gray-400">{images.length} image{images.length === 1 ? "" : "s"}</p>
        <button
          onClick={() => {
            onSave(item.key, images);
            setDirty(false);
          }}
          disabled={!dirty || isSaving}
          className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white text-sm px-3 py-1.5 rounded-lg disabled:opacity-40"
        >
          <Save className="w-3.5 h-3.5" />
          Save
        </button>
      </div>
    </div>
  );
}

interface SettingImageCardProps {
  settingKey: string;
  value: string;
  onSave: (key: string, value: string) => void;
  isSaving: boolean;
}

function SettingImageCard({ settingKey, value: initialValue, onSave, isSaving }: SettingImageCardProps) {
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
      <p className="font-mono text-xs text-gray-600 truncate mb-3" title={settingKey}>
        {settingKey}
      </p>
      <ImageUploader
        value={value}
        onChange={(url) => {
          setValue(url);
          setDirty(true);
        }}
      />
      <div className="flex items-center justify-end mt-4">
        <button
          onClick={() => {
            onSave(settingKey, value);
            setDirty(false);
          }}
          disabled={!dirty || isSaving}
          className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white text-sm px-3 py-1.5 rounded-lg disabled:opacity-40"
        >
          <Save className="w-3.5 h-3.5" />
          Save
        </button>
      </div>
    </div>
  );
}

interface SettingImageListCardProps {
  settingKey: string;
  value: string;
  onSave: (key: string, value: string) => void;
  isSaving: boolean;
}

function SettingImageListCard({ settingKey, value: initialValue, onSave, isSaving }: SettingImageListCardProps) {
  const [images, setImages] = useState<string[]>(() => initialValue.split(",").map((s) => s.trim()).filter(Boolean));
  const [dirty, setDirty] = useState(false);

  const updateAt = (index: number, url: string) => {
    setImages((prev) => prev.map((u, i) => (i === index ? url : u)));
    setDirty(true);
  };

  const removeAt = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setDirty(true);
  };

  const addImage = (url: string) => {
    setImages((prev) => [...prev, url]);
    setDirty(true);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
      <p className="font-mono text-xs text-gray-600 truncate mb-3" title={settingKey}>
        {settingKey}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((url, index) => (
          <div key={index} className="relative">
            <ImageUploader value={url} onChange={(newUrl) => updateAt(index, newUrl)} aspectClassName="aspect-square" />
            <button
              onClick={() => removeAt(index)}
              className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full shadow"
              title="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <ImageUploader value="" onChange={addImage} aspectClassName="aspect-square" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-gray-400">{images.length} image{images.length === 1 ? "" : "s"}</p>
        <button
          onClick={() => {
            onSave(settingKey, images.join(","));
            setDirty(false);
          }}
          disabled={!dirty || isSaving}
          className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white text-sm px-3 py-1.5 rounded-lg disabled:opacity-40"
        >
          <Save className="w-3.5 h-3.5" />
          Save
        </button>
      </div>
    </div>
  );
}

interface TextItemCardProps {
  item: SiteContentItem;
  editing: Partial<SiteContentItem> | undefined;
  onChange: (key: string, field: keyof SiteContentItem, value: string) => void;
  onSave: (item: SiteContentItem) => void;
  onDelete: (key: string) => void;
  isSaving: boolean;
}

function TextItemCard({ item, editing, onChange, onSave, onDelete, isSaving }: TextItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-3 mb-4">
        <p className="font-mono text-xs text-gray-500">{item.key}</p>
        <select
          value={editing?.category ?? item.category}
          onChange={(e) => onChange(item.key, "category", e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-xs capitalize shrink-0"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">French</label>
          <textarea
            value={editing?.valueFr ?? item.valueFr ?? ""}
            onChange={(e) => onChange(item.key, "valueFr", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">English</label>
          <textarea
            value={editing?.valueEn ?? item.valueEn ?? ""}
            onChange={(e) => onChange(item.key, "valueEn", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            rows={2}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Fallback value</label>
        <textarea
          value={editing?.value ?? item.value ?? ""}
          onChange={(e) => onChange(item.key, "value", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono text-gray-600"
          rows={1}
          placeholder="Used when no French/English value is set"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => onDelete(item.key)}
          className="inline-flex items-center gap-1.5 text-red-600 hover:bg-red-50 text-sm px-3 py-1.5 rounded-lg"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
        <button
          onClick={() => onSave(item)}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 bg-[#00C4D4] hover:bg-[#00b0bf] text-white text-sm px-3 py-1.5 rounded-lg disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          Save
        </button>
      </div>
    </div>
  );
}

interface CategorySectionProps {
  category: string;
  items: SiteContentItem[];
  isOpen: boolean;
  onToggle: () => void;
  editing: Record<string, Partial<SiteContentItem>>;
  onChange: (key: string, field: keyof SiteContentItem, value: string) => void;
  onSave: (item: SiteContentItem) => void;
  onDelete: (key: string) => void;
  isSaving: boolean;
}

function CategorySection({ category, items, isOpen, onToggle, editing, onChange, onSave, onDelete, isSaving }: CategorySectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-800 capitalize">{category}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{items.length}</span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      {isOpen && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 border-t border-gray-100 bg-gray-50">
          {items.map((item) => (
            <TextItemCard
              key={item.key}
              item={item}
              editing={editing[item.key]}
              onChange={onChange}
              onSave={onSave}
              onDelete={onDelete}
              isSaving={isSaving}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminContent() {
  const queryClient = useQueryClient();
  const [view, setView] = useState<"images" | "text">("images");
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<Record<string, Partial<SiteContentItem>>>({});
  const { data, isLoading } = useQuery({
    queryKey: ["admin-site-content"],
    queryFn: fetchContent,
  });

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const { data: settingsData } = useQuery({
    queryKey: ["admin-site-settings-images"],
    queryFn: fetchImageSettings,
  });

  const imageSettingRows = (settingsData?.rows ?? []).filter((r) => r.key.toLowerCase().includes("image"));

  const saveSettingMutation = useMutation({
    mutationFn: async (payload: { key: string; value: string }) => {
      const res = await fetch(`/api/site-settings/${payload.key}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ value: payload.value }),
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings-images"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Image saved", description: "Changes are now live on the website." });
    },
    onError: () => {
      toast({ title: "Failed to save image", description: "Please try again.", variant: "destructive" });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: { key: string; body: Partial<SiteContentItem> }) => {
      const res = await fetch(`/api/site-content/${payload.key}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload.body),
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast({ title: "Content saved", description: "Changes are now live on the website." });
    },
    onError: () => {
      toast({ title: "Failed to save content", description: "Please try again.", variant: "destructive" });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (body: Partial<SiteContentItem>) => {
      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to create");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast({ title: "Content created" });
    },
    onError: () => {
      toast({ title: "Failed to create content", description: "Please try again.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (key: string) => {
      const res = await fetch(`/api/site-content/${key}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast({ title: "Content deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete content", description: "Please try again.", variant: "destructive" });
    },
  });

  const handleChange = (key: string, field: keyof SiteContentItem, value: string) => {
    setEditing((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const handleSave = (item: SiteContentItem) => {
    const changes = editing[item.key] || {};
    if (Object.keys(changes).length === 0) return;
    saveMutation.mutate({ key: item.key, body: changes });
  };

  const [newKey, setNewKey] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [showNew, setShowNew] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const imageRows = (data?.rows ?? []).filter((item) => item.type === "json");
  const textRows = (data?.rows ?? []).filter((item) => item.type !== "json");

  const textRowsByCategory = new Map<string, SiteContentItem[]>();
  for (const item of textRows) {
    const list = textRowsByCategory.get(item.category) ?? [];
    list.push(item);
    textRowsByCategory.set(item.category, list);
  }
  const presentTextCategories = CATEGORIES.filter((c) => textRowsByCategory.has(c));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Content</h1>
        <button
          onClick={() => setShowNew(true)}
          className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add content
        </button>
      </div>

      <div className="flex gap-1 mb-4 border-b border-gray-200">
        <button
          onClick={() => setView("images")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            view === "images"
              ? "border-[#00C4D4] text-[#00C4D4]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Images
          <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-1.5">
            {imageRows.length + imageSettingRows.length}
          </span>
        </button>
        <button
          onClick={() => setView("text")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            view === "text"
              ? "border-[#00C4D4] text-[#00C4D4]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <FileText className="w-4 h-4" />
          Text
          <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-1.5">{textRows.length}</span>
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Key (e.g. home.hero.title)"
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                if (!newKey.trim()) return;
                createMutation.mutate({
                  key: newKey.trim(),
                  category: newCategory,
                  type: view === "images" ? "json" : "text",
                  value: view === "images" ? "[]" : "",
                  valueFr: "",
                  valueEn: "",
                });
                setNewKey("");
                setShowNew(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {view === "images" ? (
        <>
          {imageSettingRows.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Site-wide Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {imageSettingRows.map((row) =>
                  row.key.toLowerCase().endsWith("images") ? (
                    <SettingImageListCard
                      key={row.key}
                      settingKey={row.key}
                      value={row.value}
                      isSaving={saveSettingMutation.isPending}
                      onSave={(key, value) => saveSettingMutation.mutate({ key, value })}
                    />
                  ) : (
                    <SettingImageCard
                      key={row.key}
                      settingKey={row.key}
                      value={row.value}
                      isSaving={saveSettingMutation.isPending}
                      onSave={(key, value) => saveSettingMutation.mutate({ key, value })}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {imageRows.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Content Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {imageRows.map((item) => (
                  <ImageArrayCard
                    key={item.key}
                    item={item}
                    isSaving={saveMutation.isPending}
                    onDelete={(key) => deleteMutation.mutate(key)}
                    onSave={(key, images) =>
                      saveMutation.mutate({ key, body: { value: JSON.stringify(images) } })
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {imageRows.length === 0 && imageSettingRows.length === 0 && (
            <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No images found.</p>
            </div>
          )}
        </>
      ) : (
        <>
          {presentTextCategories.length === 0 && (
            <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center text-gray-400">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No text content found.</p>
            </div>
          )}
          <div className="space-y-3">
            {presentTextCategories.map((category) => (
              <CategorySection
                key={category}
                category={category}
                items={textRowsByCategory.get(category) ?? []}
                isOpen={openCategories.has(category)}
                onToggle={() => toggleCategory(category)}
                editing={editing}
                onChange={handleChange}
                onSave={handleSave}
                onDelete={(key) => deleteMutation.mutate(key)}
                isSaving={saveMutation.isPending}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
