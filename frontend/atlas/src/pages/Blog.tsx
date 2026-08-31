import { useLanguage } from "@/hooks/use-language";
import { useSiteContent } from "@/hooks/use-site-content";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: number;
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  category: string;
  imageUrl: string | null;
  publishedAt: string;
  featured: boolean;
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch("/api/blog-posts", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load blog posts");
  return res.json();
}

export default function Blog() {
  const { lang, t } = useLanguage();
  const { getText, getSetting } = useSiteContent();
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  const heroImage = getSetting("blog.hero.image", "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80");
  const primary = "var(--color-atlas-primary)";

  return (
    <div className="w-full">
      <section className="relative min-h-[60vh] flex items-end bg-[var(--color-atlas-dark)] pb-16 pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={getText("blog.hero.imageAlt", "Journal d'Atlas", "Atlas journal")}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-atlas-dark)] via-[var(--color-atlas-dark)]/85 to-transparent" />
        </div>
        <div className="absolute inset-0 z-0 hero-grid opacity-40" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--color-atlas-primary)]" />
            <span className="text-[var(--color-atlas-primary)] text-xs font-semibold tracking-[0.2em] uppercase">
              {getText("blog.hero.overline", "Actualités", "News")}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-white leading-tight max-w-3xl">
            {getText("blog.hero.title", "Blog Atlas", "Atlas Blog")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-white/55 text-lg max-w-2xl leading-relaxed">
            {getText("blog.hero.subtitle",
              "Réflexions, actualités et analyses sur les corridors Canada-Afrique et les grands enjeux internationaux.",
              "Reflections, news and analysis on Canada-Africa corridors and major international issues."
            )}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-96 rounded-2xl" />)}
            </div>
          ) : !Array.isArray(posts) || posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-20">{t("Aucun article disponible.", "No posts available.")}</p>
          ) : (
            <div>
              {Array.isArray(posts) && posts.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
                  <Link href={`/blog/${posts[0].id}`} className="group block">
                    <div className="border border-border hover:border-[var(--color-atlas-primary)]/40 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-black/8 transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative h-64 lg:h-80 overflow-hidden">
                          <img
                            src={posts[0].imageUrl ?? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"}
                            alt={lang === "fr" ? (posts[0].titleFr ?? "") : (posts[0].titleEn ?? "")}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-atlas-dark)]/20" />
                        </div>
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                          {posts[0].category && (
                            <span className="inline-block px-3 py-1 text-xs font-semibold bg-[var(--color-atlas-primary)]/10 text-[var(--color-atlas-primary)] rounded-full mb-5 w-fit">
                              {posts[0].category}
                            </span>
                          )}
                          <h2 className="font-display text-3xl md:text-4xl text-[var(--color-atlas-dark)] mb-4 leading-snug group-hover:text-[var(--color-atlas-primary)] transition-colors">
                            {lang === "fr" ? posts[0].titleFr : posts[0].titleEn}
                          </h2>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {lang === "fr" ? posts[0].summaryFr : posts[0].summaryEn}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                            {posts[0].publishedAt && (
                              <span>{new Date(posts[0].publishedAt).toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", { year: "numeric", month: "long", day: "numeric" })}</span>
                            )}
                          </div>
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-atlas-primary)]">
                            {t("Lire l'article", "Read article")}
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {posts && posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.slice(1).map((post, i) => (
                    <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                      <Link href={`/blog/${post.id}`} className="group block h-full">
                        <div className="h-full border border-border hover:border-[var(--color-atlas-primary)]/40 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={post.imageUrl ?? "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"}
                              alt={lang === "fr" ? (post.titleFr ?? "") : (post.titleEn ?? "")}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[var(--color-atlas-dark)]/30" />
                            {post.category && (
                              <span className="absolute bottom-3 left-4 px-3 py-1 text-xs font-semibold bg-[var(--color-atlas-primary)] text-white rounded-full">
                                {post.category}
                              </span>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <h3 className="font-bold text-[var(--color-atlas-dark)] mb-3 group-hover:text-[var(--color-atlas-primary)] transition-colors leading-snug flex-1">
                              {lang === "fr" ? post.titleFr : post.titleEn}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                              {lang === "fr" ? post.summaryFr : post.summaryEn}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center gap-1 font-semibold text-[var(--color-atlas-primary)]">
                                {t("Lire", "Read")} <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
