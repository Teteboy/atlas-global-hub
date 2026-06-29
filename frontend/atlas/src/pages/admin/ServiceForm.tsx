import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { ArrowLeft, Save } from "lucide-react";

export default function ServiceForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    slug: "",
    titleFr: "",
    titleEn: "",
    taglineFr: "",
    taglineEn: "",
    descriptionFr: "",
    descriptionEn: "",
    icon: "",
    color: "#00C4D4",
    deliverablesFr: "",
    deliverablesEn: "",
    mandateExamplesFr: "",
    mandateExamplesEn: "",
    order: 0,
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const url = isEdit 
        ? `http://localhost:5000/api/services/${id}`
        : `http://localhost:5000/api/services`;
      
      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Failed to save");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      window.location.href = "/admin/services";
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
          <Link href="/admin/services">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Service" : "Add New Service"}
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
              placeholder="service-slug"
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

          {/* French Tagline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline (French)</label>
            <input
              type="text"
              name="taglineFr"
              value={formData.taglineFr}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Slogan en français"
            />
          </div>

          {/* English Tagline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline (English)</label>
            <input
              type="text"
              name="taglineEn"
              value={formData.taglineEn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Tagline in English"
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

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="icon-name"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
            />
          </div>

          {/* French Deliverables */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables (French)</label>
            <textarea
              name="deliverablesFr"
              value={formData.deliverablesFr}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Livrables en français (séparés par des virgules)"
            />
          </div>

          {/* English Deliverables */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables (English)</label>
            <textarea
              name="deliverablesEn"
              value={formData.deliverablesEn}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00C4D4] focus:border-transparent outline-none"
              placeholder="Deliverables in English (comma-separated)"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link href="/admin/services">
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
