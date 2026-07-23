import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2, Loader2 } from "lucide-react";
import type { SiteContentItem } from "@/hooks/use-site-content";

interface ContentResponse {
  rows: SiteContentItem[];
}

async function fetchContent(): Promise<ContentResponse> {
  const res = await fetch("/api/site-content", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load content");
  return res.json();
}

const CATEGORIES = ["general", "home", "about", "contact", "projects", "sectors", "insights", "navigation", "footer", "theme"];

export default function AdminContent() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-site-content"], queryFn: fetchContent });
  const [editing, setEditing] = useState<Record<string, Partial<SiteContentItem>>>({});

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
                createMutation.mutate({ key: newKey.trim(), category: newCategory, type: "text", value: "", valueFr: "", valueEn: "" });
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

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">Key</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Category</th>
                <th className="px-4 py-3 font-semibold text-gray-700">French</th>
                <th className="px-4 py-3 font-semibold text-gray-700">English</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Value / JSON</th>
                <th className="px-4 py-3 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.rows.map((item) => (
                <tr key={item.key} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600 align-top">{item.key}</td>
                  <td className="px-4 py-3 align-top">
                    <select
                      value={editing[item.key]?.category ?? item.category}
                      onChange={(e) => handleChange(item.key, "category", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <textarea
                      value={editing[item.key]?.valueFr ?? item.valueFr ?? ""}
                      onChange={(e) => handleChange(item.key, "valueFr", e.target.value)}
                      className="w-full min-w-[200px] border border-gray-300 rounded-lg px-2 py-1 text-xs"
                      rows={2}
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <textarea
                      value={editing[item.key]?.valueEn ?? item.valueEn ?? ""}
                      onChange={(e) => handleChange(item.key, "valueEn", e.target.value)}
                      className="w-full min-w-[200px] border border-gray-300 rounded-lg px-2 py-1 text-xs"
                      rows={2}
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <textarea
                      value={editing[item.key]?.value ?? item.value ?? ""}
                      onChange={(e) => handleChange(item.key, "value", e.target.value)}
                      className="w-full min-w-[120px] border border-gray-300 rounded-lg px-2 py-1 text-xs"
                      rows={2}
                      placeholder="fallback / JSON"
                    />
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSave(item)}
                        disabled={saveMutation.isPending}
                        className="p-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white rounded-lg disabled:opacity-50"
                        title="Save"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(item.key)}
                        disabled={deleteMutation.isPending}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
