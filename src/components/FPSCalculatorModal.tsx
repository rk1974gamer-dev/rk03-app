import React, { useState } from 'react';
import { X, Activity, Gamepad2, Monitor, MessageSquare, Flame } from 'lucide-react';
import { CompanyInfo } from '../types';

interface FPSCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyInfo;
}

export const FPSCalculatorModal: React.FC<FPSCalculatorModalProps> = ({
  isOpen,
  onClose,
  company,
}) => {
  if (!isOpen) return null;

  const [selectedGpu, setSelectedGpu] = useState('rtx4070');
  const [selectedRes, setSelectedRes] = useState<'1080p' | '1440p' | '4k'>('1440p');

  const gpuList = [
    { id: 'rtx4060', name: 'GeForce RTX 4060 8GB', multiplier: 1.0 },
    { id: 'rtx4070', name: 'GeForce RTX 4070 Super 12GB', multiplier: 1.65 },
    { id: 'rtx4080', name: 'GeForce RTX 4080 Super 16GB', multiplier: 2.15 },
    { id: 'rtx4090', name: 'GeForce RTX 4090 24GB', multiplier: 2.8 },
  ];

  const games = [
    { name: 'Counter-Strike 2', baseFps: 280, competitive: true },
    { name: 'Valorant', baseFps: 380, competitive: true },
    { name: 'Call of Duty: Warzone', baseFps: 130, competitive: false },
    { name: 'Cyberpunk 2077 (Ultra RT)', baseFps: 65, competitive: false },
    { name: 'Grand Theft Auto V', baseFps: 175, competitive: false },
    { name: 'Fortnite (Unreal Engine 5.4)', baseFps: 160, competitive: true },
  ];

  const resMultipliers = {
    '1080p': 1.0,
    '1440p': 0.72,
    '4k': 0.48,
  };

  const currentMultiplier = (gpuList.find((g) => g.id === selectedGpu)?.multiplier || 1.0) * resMultipliers[selectedRes];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#0c1017] border border-[#243042] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1e2836] flex items-center justify-center text-[#00e5be]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Estimador de FPS & Performance Gamer</h3>
              <p className="text-xs text-slate-400">Verifique a média de quadros por segundo em alta resolução</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e2836] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Placa de Vídeo (GPU)</label>
            <select
              value={selectedGpu}
              onChange={(e) => setSelectedGpu(e.target.value)}
              className="w-full bg-[#151c26] border border-[#243042] text-white rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#00e5be] focus:outline-none"
            >
              {gpuList.map((gpu) => (
                <option key={gpu.id} value={gpu.id}>
                  {gpu.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Resolução do Monitor</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['1080p', '1440p', '4k'] as const).map((res) => (
                <button
                  key={res}
                  onClick={() => setSelectedRes(res)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold uppercase transition-all ${
                    selectedRes === res
                      ? 'bg-[#00e5be] text-black font-bold'
                      : 'bg-[#151c26] text-slate-300 border border-[#243042] hover:bg-[#1e2836]'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games FPS List */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Desempenho Estimado em {selectedRes.toUpperCase()}:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {games.map((game, i) => {
              const estimatedFps = Math.round(game.baseFps * currentMultiplier);
              const isHighFps = estimatedFps >= 144;
              return (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-[#151c26] border border-[#243042] flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold text-white truncate">{game.name}</p>
                    <span className="text-[10px] text-slate-400">
                      {game.competitive ? 'Presets Competitivos' : 'Qualidade Ultra/High'}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-base font-black font-mono ${
                        isHighFps ? 'text-[#00e5be]' : 'text-amber-400'
                      }`}
                    >
                      ~{estimatedFps} <span className="text-[10px] font-normal text-slate-400">FPS</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action WhatsApp */}
        <div className="p-3 rounded-lg bg-[#151c26] border border-[#243042] flex items-center justify-between gap-3 text-xs">
          <p className="text-slate-300">
            Deseja uma consultoria para rodar seu jogo favorito no máximo?
          </p>
          <a
            href={company.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 bg-[#00e5be] text-black font-bold rounded-lg shrink-0 whitespace-nowrap hover:bg-[#38ef7d] transition-colors"
          >
            Falar com Especialista
          </a>
        </div>

      </div>
    </div>
  );
};
