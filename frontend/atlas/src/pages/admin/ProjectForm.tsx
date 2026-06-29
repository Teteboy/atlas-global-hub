import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { ArrowLeft, Save } from "lucide-react";

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    slug: "",
    titleFr: "",
    titleEn: "",
    category: "",
    descriptionFr: "",
    descriptionEn: "",
    imageUrl: "",
    client: "",
    location: "",
    year: "",
    status: "completed",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const url = isEdit 
        ? `http://localhost:5000/api/projects/${id}`
        : `http://localhost:5000/api/projects`;
      
      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to save");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      window.location.href = "/admin/projects";
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Project" : "Add New Project"}
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
              placeholder="project-slug"
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
              placeholder="Infrastructure, Digital Economy, etc."
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
            >
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="planned">Planned</option>
            </select>
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

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Client name"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="City, Country"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="2024"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link href="/admin/projects">
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
