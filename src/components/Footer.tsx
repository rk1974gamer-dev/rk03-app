import React from 'react';
import { Phone, MapPin, Globe, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CompanyInfo } from '../types';

interface FooterProps {
  company: CompanyInfo;
  onOpenLion: () => void;
  lastSync: string;
}

export const Footer: React.FC<FooterProps> = ({ company, onOpenLion, lastSync }) => {
  return (
    <footer className="bg-[#151c26] border-t border-[#243042] mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#ff7a00] flex items-center justify-center text-white font-bold text-xs">
                RK
              </div>
              <span className="text-white font-bold text-sm tracking-tight">RK-03 TECH & GAMING</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {company.subtitle}. Montagem especializada, upgrades, consultoria técnica e suporte gamer avançado.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1e2836] text-[#00e5be] font-medium text-[11px] border border-[#243042]">
                <CheckCircle2 className="w-3 h-3" />
                {company.memberCount} membros ativos
              </span>
            </div>
          </div>

          {/* Col 2: Contatos */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Atendimento Direto</h4>
            <div className="space-y-2">
              <a
                href={company.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-[#00e5be] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#00e5be]" />
                <span>WhatsApp: {company.phone}</span>
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Telefone: {company.phone}</span>
              </a>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{company.address}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Portal e Squarespace */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Ecossistema RK-03</h4>
            <div className="space-y-1.5">
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-[#00e5be] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#00e5be]" />
                <span className="truncate">www.rk-03assemblerpc.com</span>
              </a>
              <p className="text-slate-400 text-[11px] pt-1">
                Servidor e catálogo sincronizados via backend Squarespace REST Sync.
              </p>
            </div>
          </div>

          {/* Col 4: Agente Lion & Uptime */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Agente Lion Uptime</h4>
            <div className="p-3 rounded-lg bg-[#0c1017] border border-[#243042] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00e5be]" />
                  Lion v1.0.0
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#00e5be] animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400">
                Sincronismo automático: <span className="text-slate-200">{lastSync}</span>
              </p>
              <button
                onClick={onOpenLion}
                className="w-full py-1 px-2 rounded bg-[#1e2836] hover:bg-[#243042] text-[#00e5be] text-[11px] font-semibold transition-colors"
              >
                Abrir Painel do Agente
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-[#243042] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} RK-03 ASSEMBLER PC & PC GAMER. Todos os direitos reservados.</p>
          <p className="font-mono text-[10px]">Campinas - SP • Brasil</p>
        </div>
      </div>
    </footer>
  );
};
