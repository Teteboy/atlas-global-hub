import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Save, Loader2, ImageIcon, X } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

interface SettingsResponse {
  byKey: Record<string, string>;
  rows: { key: string; value: string }[];
}

async function fetchSettings(): Promise<SettingsResponse> {
  const res = await fetch("/api/site-settings", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load settings");
  return res.json();
}

interface ImageListEditorProps {
  fieldKey: string;
  value: string;
  onChange: (value: string) => void;
}

function ImageListEditor({ fieldKey, value, onChange }: ImageListEditorProps) {
  const images = value.split(",").map((s) => s.trim()).filter(Boolean);

  const updateAt = (index: number, url: string) => {
    const next = images.map((u, i) => (i === index ? url : u));
    onChange(next.join(","));
  };

  const removeAt = (index: number) => {
    onChange(images.filter((_, i) => i !== index).join(","));
  };

  const addImage = (url: string) => {
    onChange([...images, url].join(","));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 font-mono">{fieldKey}</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {images.map((url, index) => (
          <div key={index} className="relative">
            <ImageUploader value={url} onChange={(newUrl) => updateAt(index, newUrl)} aspectClassName="aspect-square" />
            <button
              type="button"
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
    </div>
  );
}

const themeFields = [
  { key: "theme.colorDark", label: "Dark / Brand Background", default: "#041b40" },
  { key: "theme.colorPrimary", label: "Primary Accent", default: "#00c4d4" },
  { key: "theme.colorPrimaryHover", label: "Primary Accent Hover", default: "#00b0bf" },
  { key: "theme.colorLight", label: "Light / Sand Background", default: "#f5f0e6" },
  { key: "site.brandName", label: "Brand Name", default: "Atlas Global" },
  { key: "site.brandTagline", label: "Brand Tagline", default: "Resilience Corp." },
  { key: "contact.email", label: "Contact Email", default: "contact@atlasglobal.com" },
  { key: "contact.phone", label: "Contact Phone", default: "+33 1 23 45 67 89" },
  { key: "contact.address", label: "Contact Address", default: "Paris, France" },
];

export default function AdminSettings() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-site-settings"], queryFn: fetchSettings });
  const [values, setValues] = useState<Record<string, string>>({});

  const imageKeys = (data?.rows ?? [])
    .map((r) => r.key)
    .filter((key) => key.toLowerCase().includes("image"));

  useEffect(() => {
    if (data?.byKey) {
      const initial: Record<string, string> = {};
      for (const field of themeFields) {
        initial[field.key] = data.byKey[field.key] ?? field.default;
      }
      for (const key of imageKeys) {
        initial[key] = data.byKey[key] ?? "";
      }
      setValues(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async (updates: Record<string, string>) => {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });

  const handleSave = () => {
    saveMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings & Theme</h1>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-6">
        {themeFields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <div className="flex items-center gap-3">
              {field.key.startsWith("theme.color") && (
                <input
                  type="color"
                  value={values[field.key] ?? field.default}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-12 h-10 p-0 border border-gray-300 rounded cursor-pointer"
                />
              )}
              <input
                type="text"
                value={values[field.key] ?? field.default}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">Changes are applied site-wide immediately.</p>
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saveMutation.isPending ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      {imageKeys.length > 0 && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 space-y-6 mt-6">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Images</h2>
          </div>

          {imageKeys.map((key) =>
            key.toLowerCase().endsWith("images") ? (
              <ImageListEditor
                key={key}
                fieldKey={key}
                value={values[key] ?? ""}
                onChange={(value) => setValues((prev) => ({ ...prev, [key]: value }))}
              />
            ) : (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-mono">{key}</label>
                <div className="max-w-xs">
                  <ImageUploader
                    value={values[key] ?? ""}
                    onChange={(url) => setValues((prev) => ({ ...prev, [key]: url }))}
                  />
                </div>
              </div>
            )
          )}

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">Changes are applied site-wide immediately.</p>
            <button
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? "Saving..." : "Save Images"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
