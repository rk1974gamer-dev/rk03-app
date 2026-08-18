import React from 'react';
import { MessageSquare, Phone, Globe, MapPin, ExternalLink } from 'lucide-react';
import { CompanyInfo } from '../types';

interface ContactCardProps {
  company: CompanyInfo;
}

export const ContactCard: React.FC<ContactCardProps> = ({ company }) => {
  return (
    <div className="bg-[#151c26] rounded-xl border border-[#243042] p-5 space-y-4">
      <h3 className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00e5be]" />
        Canais de Contato & Localização
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* WhatsApp */}
        <a
          href={company.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-lg bg-[#0c1017] border border-[#243042] hover:border-[#00e5be]/50 transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1e2836] flex items-center justify-center text-[#00e5be] group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-400">WhatsApp Oficial</p>
            <p className="text-sm font-semibold text-white truncate">{company.phone}</p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00e5be]" />
        </a>

        {/* Telefone */}
        <a
          href={`tel:${company.phoneRaw}`}
          className="p-3 rounded-lg bg-[#0c1017] border border-[#243042] hover:border-[#00e5be]/50 transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1e2836] flex items-center justify-center text-[#2979ff] group-hover:scale-105 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-400">Ligação Direta</p>
            <p className="text-sm font-semibold text-white truncate">{company.phone}</p>
          </div>
        </a>

        {/* Site */}
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-lg bg-[#0c1017] border border-[#243042] hover:border-[#00e5be]/50 transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1e2836] flex items-center justify-center text-[#00e5be] group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-400">Portal Web</p>
            <p className="text-sm font-semibold text-white truncate">rk-03assemblerpc.com</p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00e5be]" />
        </a>

        {/* Localização */}
        <a
          href={company.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-lg bg-[#0c1017] border border-[#243042] hover:border-[#00e5be]/50 transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1e2836] flex items-center justify-center text-[#ff7a00] group-hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-400">Campinas / SP</p>
            <p className="text-sm font-semibold text-white truncate">Av. Sen. Antônio Lacerda Franco</p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00e5be]" />
        </a>

      </div>
    </div>
  );
};
