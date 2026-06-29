import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { ArrowLeft, Save } from "lucide-react";

export default function InsightForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    slug: "",
    titleFr: "",
    titleEn: "",
    summaryFr: "",
    summaryEn: "",
    bodyFr: "",
    bodyEn: "",
    category: "",
    imageUrl: "",
    featured: false,
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const url = isEdit 
        ? `http://localhost:5000/api/insights/${id}`
        : `http://localhost:5000/api/insights`;
      
      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to save");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights"] });
      window.location.href = "/admin/insights";
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/insights">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Insight" : "Add New Insight"}
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
              placeholder="insight-slug"
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

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Policy, Market Analysis, etc."
              required
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-[#00C4D4] border-gray-300 rounded focus:ring-[#00C4D4]"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured</label>
          </div>

          {/* French Summary */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Summary (French)</label>
            <textarea
              name="summaryFr"
              value={formData.summaryFr}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Résumé en français"
            />
          </div>

          {/* English Summary */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Summary (English)</label>
            <textarea
              name="summaryEn"
              value={formData.summaryEn}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Summary in English"
            />
          </div>

          {/* French Body */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Body (French)</label>
            <textarea
              name="bodyFr"
              value={formData.bodyFr}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Contenu en français"
            />
          </div>

          {/* English Body */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Body (English)</label>
            <textarea
              name="bodyEn"
              value={formData.bodyEn}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Content in English"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
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
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link href="/admin/insights">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </Link>
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
