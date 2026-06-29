import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useListSectors } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminSectors() {
  const queryClient = useQueryClient();
  const { data: sectors, isLoading } = useListSectors();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`http://localhost:5000/api/sectors/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this sector?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sectors Management</h1>
        <Link href="/admin/sectors/new">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Sector
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title (FR)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title (EN)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Corridor</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sectors?.map((sector, i) => (
              <motion.tr
                key={sector.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm text-gray-900">{sector.titleFr}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{sector.titleEn}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{sector.corridor}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/sectors/${sector.id}/edit`}>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(sector.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
