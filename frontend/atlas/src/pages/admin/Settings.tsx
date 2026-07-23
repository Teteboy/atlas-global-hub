import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Save, Loader2 } from "lucide-react";

interface SettingsResponse {
  byKey: Record<string, string>;
}

async function fetchSettings(): Promise<SettingsResponse> {
  const res = await fetch("/api/site-settings", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load settings");
  return res.json();
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

  useEffect(() => {
    if (data?.byKey) {
      const initial: Record<string, string> = {};
      for (const field of themeFields) {
        initial[field.key] = data.byKey[field.key] ?? field.default;
      }
      setValues(initial);
    }
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
    </div>
  );
}
