
import { NewsArticle } from "@/src/types/news";
import { ExternalLink, Clock, Globe } from "lucide-react";
import Link from "next/link";

export const NewsCard = ({ article }: { article: NewsArticle }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("sr-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="border-r border-b border-gray-100 flex flex-col group">
      {article.image && (
        <div className="overflow-hidden border-b-2 border-gray-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#2bc3c3]">
            <Globe size={10} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest">{article.source.name}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={10} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest">{formattedDate}</span>
          </div>
        </div>

        <h3 className="text-base font-[1000] text-[#1a3a94] uppercase leading-tight line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {article.description}
        </p>

        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-2 w-full bg-[#1a3a94] text-white py-3 font-black uppercase tracking-widest text-xs border-4 border-[#1a3a94] shadow-[4px_4px_0px_0px_rgba(43,195,195,1)] hover:bg-[#2bc3c3] hover:text-[#1a3a94] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          <ExternalLink size={12} strokeWidth={3} />
          Citaj clanak
        </Link>
      </div>
    </div>
  );
};