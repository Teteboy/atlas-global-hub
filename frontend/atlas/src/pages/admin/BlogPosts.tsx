import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface BlogPost {
  id: number;
  titleFr: string;
  titleEn: string;
  category: string;
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch("/api/blog-posts", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load blog posts");
  return res.json();
}

export default function AdminBlogPosts() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/blog-posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Link href="/admin/blog-posts/new">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Blog Post
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title (FR)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title (EN)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts?.map((post, i) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm text-gray-900">{post.titleFr}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{post.titleEn}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{post.category}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/blog-posts/${post.id}/edit`}>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
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
