'use client';
import { NewsArticle } from "@/src/types/news";
import { newsService } from "@/src/services/publicAPI/newsService";
import { useEffect, useState } from "react";
import { LoadingState } from "@/src/components/ui/LoadingState";
import { ErrorState } from "@/src/components/ui/ErrorState";
import { Newspaper } from "lucide-react";
import { NewsCard } from "@/src/components/ui/NewsCard";

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await newsService.getTechNews();
        setNews(data.articles ?? data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Greska pri dobavljanju vesti");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a3a94]">
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-8">

        <div className="mb-12 border-b-8 border-[#1a3a94] pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper size={16} strokeWidth={3} className="text-[#2bc3c3]" />
            <p className="text-xs font-black uppercase tracking-widest text-[#2bc3c3]">— IT Vesti</p>
          </div>
          <h1 className="text-6xl font-[1000] uppercase text-[#1a3a94] leading-none">
            Najnovije <span className="text-[#2bc3c3]">Vesti.</span>
          </h1>
          <p className="text-slate-400 uppercase tracking-widest text-sm mt-4">
            Pracenje najvaznijih dogadjaja iz sveta tehnologije i IT industrije.
          </p>
        </div>

        {loading && <LoadingState />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100">
            {news.length > 0 ? (
              news.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-r border-b border-gray-100">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                  Trenutno nema vesti. Proverite kasnije!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}