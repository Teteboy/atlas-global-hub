import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { ArrowLeft, Save } from "lucide-react";

export default function SectorForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    slug: "",
    titleFr: "",
    titleEn: "",
    descriptionFr: "",
    descriptionEn: "",
    corridor: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!isEdit) return;

    fetch(`/api/sectors/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load sector");
        return response.json();
      })
      .then((sector) => {
        setFormData({
          slug: sector.slug ?? "",
          titleFr: sector.titleFr ?? "",
          titleEn: sector.titleEn ?? "",
          descriptionFr: sector.descriptionFr ?? "",
          descriptionEn: sector.descriptionEn ?? "",
          corridor: sector.corridor ?? "",
          imageUrl: "",
        });
      })
      .catch(() => undefined);
  }, [id, isEdit]);

  const mutation = useMutation({
    mutationFn: async ({ imageUrl: _imageUrl, ...data }: typeof formData) => {
      const response = await fetch(isEdit ? `/api/sectors/${id}` : "/api/sectors", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          icon: "Globe2",
          countries: [],
          highlights: [],
        }),
      });
      if (!response.ok) throw new Error("Failed to save sector");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
      window.location.href = "/admin/sectors";
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/sectors">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Sector" : "Add New Sector"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slug */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="sector-slug"
              required
            />
          </div>

          {/* French Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title (French)</label>
            <input
              type="text"
              name="titleFr"
              value={formData.titleFr}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Titre en français"
              required
            />
          </div>

          {/* English Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title (English)</label>
            <input
              type="text"
              name="titleEn"
              value={formData.titleEn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Title in English"
              required
            />
          </div>

          {/* Corridor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Corridor</label>
            <input
              type="text"
              name="corridor"
              value={formData.corridor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Canada–Cameroun, Canada–Nigeria, etc."
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* French Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (French)</label>
            <textarea
              name="descriptionFr"
              value={formData.descriptionFr}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Description en français"
            />
          </div>

          {/* English Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
            <textarea
              name="descriptionEn"
              value={formData.descriptionEn}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Description in English"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link href="/admin/sectors">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </Link>
          {mutation.isError && <p className="text-sm text-red-600">Unable to save the sector. Please try again.</p>}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex items-center gap-2 bg-[#00C4D4] hover:bg-[#00b0bf] text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
