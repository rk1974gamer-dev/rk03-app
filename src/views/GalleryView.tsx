import React from 'react';
import { Sparkles, Cpu, Layers, Zap, MessageSquare, Eye } from 'lucide-react';
import { SetupGalleryItem, CompanyInfo } from '../types';

interface GalleryViewProps {
  setups: SetupGalleryItem[];
  onSelectSetup: (setup: SetupGalleryItem) => void;
  company: CompanyInfo;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  setups,
  onSelectSetup,
  company,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#243042] pb-5">
        <h1 className="text-2xl font-black text-white">Galeria de Setups RK-03</h1>
        <p className="text-xs text-slate-400 mt-1">
          Máquinas de alta performance montadas e personalizadas pela bancada de engenharia da RK-03.
        </p>
      </div>

      {/* Setups Grid */}
      <div className="space-y-6">
        {setups.map((setup) => (
          <div
            key={setup.id}
            className="bg-[#151c26] rounded-2xl border border-[#243042] overflow-hidden hover:border-[#00e5be]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Image Column */}
            <div
              onClick={() => onSelectSetup(setup)}
              className="lg:col-span-6 relative h-64 lg:h-auto min-h-[280px] bg-[#1e2836] cursor-pointer overflow-hidden group"
            >
              <img
                src={setup.image}
                alt={setup.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded bg-black/80 text-[#00e5be] text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  Custom Build
                </span>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h2
                    onClick={() => onSelectSetup(setup)}
                    className="text-xl font-bold text-white hover:text-[#00e5be] cursor-pointer"
                  >
                    {setup.title}
                  </h2>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{setup.desc}</p>

                {/* Specs Pill Summary */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-[#0c1017] border border-[#243042] flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#00e5be] shrink-0" />
                    <span className="text-xs text-slate-200 truncate">{setup.specs.cpu}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0c1017] border border-[#243042] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#2979ff] shrink-0" />
                    <span className="text-xs text-slate-200 truncate">{setup.specs.gpu}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-[#243042] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-400">Estimativa do Setup</span>
                  <p className="text-xl font-black text-white font-mono">{setup.estimatedPrice}</p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onSelectSetup(setup)}
                    className="flex-1 sm:flex-none py-2 px-4 rounded-lg bg-[#00e5be] hover:bg-[#38ef7d] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Ficha Completa</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
