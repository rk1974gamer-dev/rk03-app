import React, { useState } from 'react';
import {
  Search,
  Cpu,
  Activity,
  ShieldCheck,
  MessageSquare,
  MapPin,
  Globe,
  Smartphone,
  ExternalLink,
  Layers,
  Wrench,
  Terminal,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { LauncherAppItem, CompanyInfo } from '../types';

interface LauncherHubViewProps {
  apps: LauncherAppItem[];
  company: CompanyInfo;
  onOpenPCBuilder: () => void;
  onOpenFPSCalc: () => void;
  onOpenLion: () => void;
}

export const LauncherHubView: React.FC<LauncherHubViewProps> = ({
  apps,
  company,
  onOpenPCBuilder,
  onOpenFPSCalc,
  onOpenLion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLaunchApp = (app: LauncherAppItem) => {
    if (app.actionType === 'tool') {
      if (app.target === 'builder') onOpenPCBuilder();
      else if (app.target === 'fps-calc') onOpenFPSCalc();
      else if (app.target === 'lion-monitor') onOpenLion();
    } else if (app.actionType === 'link') {
      window.open(app.target, '_blank');
    }
  };

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#00e5be]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#2979ff]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#38ef7d]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#00e5be]" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-[#ff7a00]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#2979ff]" />;
      default:
        return <Smartphone className="w-6 h-6 text-slate-300" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-[#151c26] rounded-2xl border border-[#243042] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0c1017] border border-[#243042] flex items-center justify-center text-[#00e5be]">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">RK-03 App Hub & Launcher Drawer</h1>
            <p className="text-xs text-slate-400">
              Gaveta de utilitários, monitoramento e atalhos rápidos do ecossistema RK-03.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-[#0c1017] text-xs font-mono text-[#00e5be] border border-[#243042]">
            Android / Web Hub v1.0
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar aplicativos e ferramentas instaladas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151c26] border border-[#243042] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00e5be]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'tools', label: 'Ferramentas' },
            { id: 'gaming', label: 'Games & FPS' },
            { id: 'system', label: 'Sistema' },
            { id: 'social', label: 'Contato' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#00e5be] text-black font-bold'
                  : 'bg-[#151c26] text-slate-400 border border-[#243042] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleLaunchApp(app)}
            className="bg-[#151c26] hover:bg-[#1e2836] border border-[#243042] hover:border-[#00e5be]/40 rounded-2xl p-4 flex flex-col items-center text-center transition-all group relative focus:outline-none focus:ring-2 focus:ring-[#00e5be]"
          >
            {app.badge && (
              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#00e5be] text-black text-[9px] font-black uppercase">
                {app.badge}
              </span>
            )}

            <div className="w-14 h-14 rounded-2xl bg-[#0c1017] border border-[#243042] flex items-center justify-center group-hover:scale-110 transition-transform mb-3 shadow-inner">
              {getAppIcon(app.icon)}
            </div>

            <span className="text-xs font-bold text-white group-hover:text-[#00e5be] transition-colors line-clamp-1">
              {app.name}
            </span>

            <span className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-tight">
              {app.description}
            </span>
          </button>
        ))}
      </div>

      {/* Android Launcher APK & AAB Compilation Info Card */}
      <div className="bg-[#151c26] rounded-2xl border border-[#243042] p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00e5be]" />
          Arquitetura Multiplataforma (Web + Android Launcher)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Este ecossistema foi projetado para rodar tanto como aplicativo Web progressivo quanto como Launcher nativo Android através dos pacotes <code className="text-[#00e5be] font-mono">com.rk03.launcher</code> com suporte a App Bundle (.aab) e APKs otimizados para smartphones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-[#0c1017] border border-[#243042]">
            <p className="text-xs font-bold text-white">Publicação na Google Play Store</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Empacotamento <code className="text-[#00e5be]">.AAB</code> com split de densidade e ABI via Gradle 8.1.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-[#0c1017] border border-[#243042]">
            <p className="text-xs font-bold text-white">Sincronização com Squarespace</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Cache offline bidirecional com JSON REST e Agente Lion cron.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
