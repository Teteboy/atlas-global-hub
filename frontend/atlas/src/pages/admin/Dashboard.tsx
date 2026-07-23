import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useGetSiteStats } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  FolderKanban,
  FileText,
  Globe,
  ArrowUpRight,
  Clock
} from "lucide-react";

const statConfig = [
  { label: "Services", key: "totalServices", icon: Briefcase, color: "bg-emerald-500", href: "/admin/services" },
  { label: "Projects", key: "totalProjects", icon: FolderKanban, color: "bg-blue-500", href: "/admin/projects" },
  { label: "Insights", key: "totalInsights", icon: FileText, color: "bg-amber-500", href: "/admin/insights" },
  { label: "Countries", key: "totalCountries", icon: Globe, color: "bg-violet-500", href: "/admin/sectors" },
];

export default function AdminDashboard() {
  const { lang } = useLanguage();
  const { data: stats, isLoading } = useGetSiteStats();

  const statValue = (key: string) => {
    if (!stats) return "—";
    const value = (stats as unknown as Record<string, unknown>)[key];
    return typeof value === "number" ? value.toString() : "—";
  };

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
          {statConfig.map((stat, i) => (
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
                  {isLoading ? (
                    <Skeleton className="w-12 h-8" />
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">{statValue(stat.key)}</span>
                  )}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Projects</h2>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <Skeleton key={i} className="w-full h-16" />)}
              </div>
            ) : !stats?.featuredProjects?.length ? (
              <p className="text-sm text-gray-500">No featured projects.</p>
            ) : (
              <div className="space-y-4">
                {stats.featuredProjects.map((project) => (
                  <Link key={project.id} href={`/admin/projects/${project.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lang === "fr" ? project.titleFr : project.titleEn}</p>
                      <p className="text-xs text-gray-500">{project.category}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Insights</h2>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map(i => <Skeleton key={i} className="w-full h-16" />)}
              </div>
            ) : !stats?.recentInsights?.length ? (
              <p className="text-sm text-gray-500">No recent insights.</p>
            ) : (
              <div className="space-y-4">
                {stats.recentInsights.map((insight) => (
                  <Link key={insight.id} href={`/admin/insights/${insight.id}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lang === "fr" ? insight.titleFr : insight.titleEn}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {insight.category}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
