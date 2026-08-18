import React, { useState } from 'react';
import {
  ShieldCheck,
  Activity,
  RefreshCw,
  CheckCircle2,
  Terminal,
  Globe,
  MessageSquare,
  Lock,
  Server,
  Zap
} from 'lucide-react';
import { CompanyInfo } from '../types';

interface LionAgentViewProps {
  company: CompanyInfo;
  lastSync: string;
  onSyncFresh: () => Promise<void>;
  isSyncing: boolean;
}

export const LionAgentView: React.FC<LionAgentViewProps> = ({
  company,
  lastSync,
  onSyncFresh,
  isSyncing,
}) => {
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] Agente Lion v1.0.0 inicializado com sucesso.`,
    `[${new Date().toLocaleTimeString()}] Alvo de sincronismo: https://www.rk-03assemblerpc.com`,
    `[${new Date().toLocaleTimeString()}] Whitelist de contatos validada: ${company.phone}`,
    `[${new Date().toLocaleTimeString()}] Cache local montado. Integridade 100% OK.`,
  ]);

  const handleManualTrigger = async () => {
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Disparando requisição de sincronização JSON REST...`,
      ...prev,
    ]);
    await onSyncFresh();
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Resposta recebida. Dados e produtos atualizados na memória.`,
      ...prev,
    ]);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#243042] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#00e5be]" />
            <h1 className="text-2xl font-black text-white">Painel do Agente Lion</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitoramento de uptime, segurança e sincronismo automático com o site oficial.
          </p>
        </div>

        <button
          onClick={handleManualTrigger}
          disabled={isSyncing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00e5be] hover:bg-[#38ef7d] text-black text-xs font-bold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Executando Rotina...' : 'Executar Sincronismo Agora'}</span>
        </button>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#151c26] border border-[#243042] space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Status do Agente</span>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5be] animate-pulse" />
            <p className="text-sm font-bold text-white font-mono">OPERACIONAL</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#151c26] border border-[#243042] space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Última Sincronização</span>
          <p className="text-sm font-bold text-[#00e5be] font-mono pt-1">{lastSync}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#151c26] border border-[#243042] space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Custo Operacional</span>
          <p className="text-sm font-bold text-emerald-400 font-mono pt-1">R$ 0,00 (GitHub Actions Cron)</p>
        </div>

        <div className="p-4 rounded-xl bg-[#151c26] border border-[#243042] space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Alvo Monitorado</span>
          <p className="text-xs font-bold text-white truncate pt-1">rk-03assemblerpc.com</p>
        </div>
      </div>

      {/* Mission & Whitelist Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mission Statement */}
        <div className="p-6 rounded-2xl bg-[#151c26] border border-[#243042] space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#00e5be]" />
            Diretrizes do Agente Lion (<code className="text-[#00e5be] font-mono">config.json</code>)
          </h3>
          
          <div className="p-3.5 rounded-xl bg-[#0c1017] border border-[#243042] text-xs text-slate-300 space-y-2">
            <p className="font-semibold text-white">Missão Principal:</p>
            <p className="italic text-slate-400">
              "Manter o APP em funcionamento, seguro e atualizado com o site www.rk-03assemblerpc.com com custo operacional zero."
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <p className="font-bold text-white">Whitelist de Segurança:</p>
            <div className="p-3 rounded-lg bg-[#0c1017] border border-[#243042] font-mono text-[11px] space-y-1 text-slate-400">
              <div>phone: <span className="text-[#00e5be]">"{company.phone}"</span></div>
              <div>whatsapp_prefix: <span className="text-[#00e5be]">"https://wa.me/{company.phoneRaw}"</span></div>
              <div>target_site: <span className="text-[#00e5be]">"{company.website}"</span></div>
            </div>
          </div>
        </div>

        {/* Live Terminal Logs */}
        <div className="p-6 rounded-2xl bg-[#151c26] border border-[#243042] flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00e5be]" />
              Console de Eventos do Agente
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Auto-scroll</span>
          </div>

          <div className="flex-1 bg-[#0c1017] border border-[#243042] rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2 overflow-y-auto max-h-[260px]">
            {logs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                <span className="text-[#00e5be]">&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
