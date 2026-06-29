import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  FileText, 
  Globe, 
  MessageSquare,
  Users,
  TrendingUp
} from "lucide-react";

const stats = [
  { label: "Services", value: "5", icon: Briefcase, color: "bg-blue-500", href: "/admin/services" },
  { label: "Projects", value: "2", icon: FolderKanban, color: "bg-green-500", href: "/admin/projects" },
  { label: "Insights", value: "6", icon: FileText, color: "bg-purple-500", href: "/admin/insights" },
  { label: "Sectors", value: "4", icon: Globe, color: "bg-orange-500", href: "/admin/sectors" },
];

export default function AdminDashboard() {
  const { t } = useLanguage();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your website content</p>
            </div>
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              View Site →
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Link key={i} href={stat.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
                <p className="text-sm text-gray-500 mt-1">Manage {stat.label.toLowerCase()}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/services/new">
              <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Briefcase className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Add New Service</span>
              </button>
            </Link>
            <Link href="/admin/projects/new">
              <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FolderKanban className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Add New Project</span>
              </button>
            </Link>
            <Link href="/admin/insights/new">
              <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Add New Insight</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Database seeded successfully</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Admin dashboard created</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
