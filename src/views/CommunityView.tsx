import React, { useState } from 'react';
import { BookOpen, ThumbsUp, MessageSquare, Clock, User, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { CommunityGuide, CompanyInfo } from '../types';
import { initialGuides } from '../data/mockData';

interface CommunityViewProps {
  company: CompanyInfo;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ company }) => {
  const [guides, setGuides] = useState<CommunityGuide[]>(initialGuides);
  const [likedGuides, setLikedGuides] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedGuides((prev) => {
      const isLiked = prev[id];
      const updated = { ...prev, [id]: !isLiked };
      setGuides((gList) =>
        gList.map((g) => (g.id === id ? { ...g, likes: g.likes + (isLiked ? -1 : 1) } : g))
      );
      return updated;
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#243042] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Blog Técnico & Dicas RK-03</h1>
          <p className="text-xs text-slate-400 mt-1">
            Artigos, boas práticas de montagem, otimização de fluxo de ar e testes de hardware.
          </p>
        </div>

        <a
          href={`${company.website}/blog`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#151c26] border border-[#243042] text-xs font-semibold text-[#00e5be] hover:bg-[#1e2836] transition-colors self-start sm:self-auto"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Acessar Blog no Squarespace</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Guides Grid */}
      <div className="space-y-6">
        {guides.map((guide) => {
          const isLiked = likedGuides[guide.id];
          return (
            <article
              key={guide.id}
              className="bg-[#151c26] rounded-2xl border border-[#243042] p-6 space-y-4 hover:border-slate-600 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded bg-[#0c1017] text-[#00e5be] text-xs font-bold uppercase tracking-wider border border-[#243042]">
                  {guide.category}
                </span>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {guide.readTime} de leitura
                  </span>
                  <span>•</span>
                  <span>{guide.date}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-white hover:text-[#00e5be] transition-colors cursor-pointer">
                {guide.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                {guide.summary}
              </p>

              <div className="p-4 rounded-xl bg-[#0c1017] border border-[#243042]/70 text-xs text-slate-300 leading-relaxed">
                {guide.content}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-[#243042]">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-300 font-medium">{guide.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(guide.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isLiked
                        ? 'bg-[#00e5be]/20 text-[#00e5be] border border-[#00e5be]/40'
                        : 'bg-[#0c1017] text-slate-400 hover:text-white border border-[#243042]'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{guide.likes} Útil</span>
                  </button>

                  <a
                    href={company.whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c1017] text-slate-300 hover:text-[#00e5be] border border-[#243042] text-xs font-semibold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Dúvidas?</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
