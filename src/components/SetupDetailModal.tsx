import React from 'react';
import { X, MessageSquare, Cpu, HardDrive, Zap, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { SetupGalleryItem, CompanyInfo } from '../types';

interface SetupDetailModalProps {
  setup: SetupGalleryItem | null;
  onClose: () => void;
  company: CompanyInfo;
}

export const SetupDetailModal: React.FC<SetupDetailModalProps> = ({
  setup,
  onClose,
  company,
}) => {
  if (!setup) return null;

  const handleOrderSetupWhatsApp = () => {
    const text = `Olá! Gostaria de um orçamento para montar uma máquina com especificações similares ao setup *${setup.title}* (${setup.estimatedPrice}) que vi na Galeria RK-03.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${company.phoneRaw}?text=${encoded}`, '_blank');
  };

  const specRows = [
    { label: 'Processador (CPU)', value: setup.specs.cpu, icon: Cpu },
    { label: 'Placa de Vídeo (GPU)', value: setup.specs.gpu, icon: Zap },
    { label: 'Memória RAM', value: setup.specs.ram, icon: Layers },
    { label: 'Armazenamento', value: setup.specs.storage, icon: HardDrive },
    { label: 'Placa-Mãe', value: setup.specs.motherboard, icon: Layers },
    { label: 'Refrigeração / Cooler', value: setup.specs.cooling, icon: Sparkles },
    { label: 'Gabinete', value: setup.specs.case, icon: Layers },
    { label: 'Fonte de Alimentação', value: setup.specs.power, icon: Zap },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#0c1017] border border-[#243042] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#151c26]/90 text-slate-300 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#151c26]">
          <img
            src={setup.image}
            alt={setup.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#00e5be] uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded">
                Custom Build RK-03
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {setup.title}
              </h3>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-slate-400">Estimativa do Setup</span>
              <p className="text-xl font-bold text-[#00e5be] font-mono">{setup.estimatedPrice}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div>
            <p className="text-sm text-slate-300 leading-relaxed">{setup.desc}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#151c26] text-xs text-slate-300 border border-[#243042]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5be]" />
              <span className="font-semibold text-white">Ideal para:</span> {setup.idealFor}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Ficha Técnica & Componentes:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {specRows.map((spec, i) => {
                const IconComponent = spec.icon;
                return (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-[#151c26] border border-[#243042] flex items-start gap-2.5"
                  >
                    <div className="p-1.5 rounded bg-[#0c1017] text-[#00e5be] shrink-0 mt-0.5">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">{spec.label}</p>
                      <p className="text-xs font-medium text-white truncate">{spec.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#243042] flex flex-col sm:flex-row gap-3 items-center justify-between">
            <p className="text-xs text-slate-400">
              Peças 100% originais com garantia nacional e bancada de teste térmico.
            </p>
            <button
              onClick={handleOrderSetupWhatsApp}
              className="w-full sm:w-auto py-2.5 px-6 rounded-lg bg-[#00e5be] hover:bg-[#38ef7d] text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar Orçamento deste Setup</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
