import React, { useState } from 'react';
import { X, Cpu, HardDrive, Layers, Sparkles, Zap, MessageSquare, Check, RotateCcw } from 'lucide-react';
import { CompanyInfo } from '../types';

interface PCBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyInfo;
}

interface ComponentOption {
  id: string;
  name: string;
  price: number;
  tdp: number;
}

export const PCBuilderModal: React.FC<PCBuilderModalProps> = ({
  isOpen,
  onClose,
  company,
}) => {
  if (!isOpen) return null;

  const cpuOptions: ComponentOption[] = [
    { id: 'i5', name: 'Intel Core i5-14400F (10 Cores / 16 Threads)', price: 1190, tdp: 65 },
    { id: 'i7', name: 'Intel Core i7-14700KF (20 Cores / 28 Threads)', price: 2590, tdp: 125 },
    { id: 'i9', name: 'Intel Core i9-14900K (24 Cores / 32 Threads)', price: 3890, tdp: 253 },
    { id: 'r5', name: 'AMD Ryzen 5 7600 (6 Cores / 12 Threads)', price: 1290, tdp: 65 },
    { id: 'r7', name: 'AMD Ryzen 7 7800X3D (O Melhor para Games)', price: 2790, tdp: 120 },
    { id: 'r9', name: 'AMD Ryzen 9 7950X3D (16 Cores / 32 Threads)', price: 4190, tdp: 120 },
  ];

  const gpuOptions: ComponentOption[] = [
    { id: 'rtx4060', name: 'NVIDIA GeForce RTX 4060 8GB GDDR6', price: 2190, tdp: 115 },
    { id: 'rtx4060ti', name: 'NVIDIA GeForce RTX 4060 Ti 16GB', price: 3190, tdp: 165 },
    { id: 'rtx4070s', name: 'NVIDIA GeForce RTX 4070 Super 12GB', price: 4690, tdp: 220 },
    { id: 'rtx4070tis', name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB', price: 6290, tdp: 285 },
    { id: 'rtx4080s', name: 'NVIDIA GeForce RTX 4080 Super 16GB', price: 7990, tdp: 320 },
    { id: 'rtx4090', name: 'NVIDIA GeForce RTX 4090 24GB Monster', price: 14900, tdp: 450 },
  ];

  const ramOptions: ComponentOption[] = [
    { id: 'ram16', name: '16GB (2x8GB) DDR5 5600MHz Kingston Fury', price: 490, tdp: 10 },
    { id: 'ram32', name: '32GB (2x16GB) DDR5 6000MHz Corsair RGB', price: 890, tdp: 15 },
    { id: 'ram64', name: '64GB (2x32GB) DDR5 6000MHz G.Skill Trident Z', price: 1690, tdp: 20 },
  ];

  const storageOptions: ComponentOption[] = [
    { id: 'ssd1tb', name: '1TB NVMe M.2 Gen4 (5000MB/s)', price: 450, tdp: 5 },
    { id: 'ssd2tb', name: '2TB NVMe M.2 Gen4 High-End (7400MB/s)', price: 890, tdp: 8 },
    { id: 'ssd4tb', name: '4TB NVMe M.2 Gen4 Ultimate Pro', price: 1890, tdp: 10 },
  ];

  const [selectedCpu, setSelectedCpu] = useState<ComponentOption>(cpuOptions[1]);
  const [selectedGpu, setSelectedGpu] = useState<ComponentOption>(gpuOptions[2]);
  const [selectedRam, setSelectedRam] = useState<ComponentOption>(ramOptions[1]);
  const [selectedStorage, setSelectedStorage] = useState<ComponentOption>(storageOptions[1]);

  const baseComponentsPrice = 1600; // Motherboard + Case + Power Supply + Assembly & Testing
  const totalEstimated = selectedCpu.price + selectedGpu.price + selectedRam.price + selectedStorage.price + baseComponentsPrice;
  const totalTdp = selectedCpu.tdp + selectedGpu.tdp + selectedRam.tdp + selectedStorage.tdp + 60;
  const recommendedPowerWatts = totalTdp > 550 ? 1000 : totalTdp > 400 ? 850 : 650;

  const handleSendBuilderWhatsApp = () => {
    let text = `*Orçamento Customizado - Simulador de PC RK-03*\n\n`;
    text += `• *CPU:* ${selectedCpu.name}\n`;
    text += `• *GPU:* ${selectedGpu.name}\n`;
    text += `• *RAM:* ${selectedRam.name}\n`;
    text += `• *SSD:* ${selectedStorage.name}\n`;
    text += `• *Fonte Sugerida:* ${recommendedPowerWatts}W 80 Plus Gold\n`;
    text += `• *Gabinete + Placa-Mãe + Montagem Profissional Inclusa*\n\n`;
    text += `*Valor Estimado Total: R$ ${totalEstimated.toLocaleString('pt-BR')}*\n\n`;
    text += `Gostaria de fechar este orçamento ou consultar opções de pagamento à vista!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${company.phoneRaw}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#0c1017] border border-[#243042] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#243042] bg-[#151c26] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1e2836] flex items-center justify-center text-[#00e5be]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Calculadora & Montador de Setup RK-03</h3>
              <p className="text-xs text-slate-400">Monte seu PC ideal e calcule TDP, fonte e orçamento em tempo real</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e2836] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Builder selection area */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* CPU Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#00e5be]" />
              1. Processador (CPU)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cpuOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedCpu(opt)}
                  className={`p-3 rounded-lg text-left text-xs transition-all border ${
                    selectedCpu.id === opt.id
                      ? 'bg-[#151c26] border-[#00e5be] text-white shadow-sm'
                      : 'bg-[#0c1017] border-[#243042] text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <p className="font-semibold text-white truncate">{opt.name}</p>
                  <p className="text-[#00e5be] font-mono font-bold mt-1">
                    R$ {opt.price.toLocaleString('pt-BR')} <span className="text-slate-500 font-normal text-[10px]">({opt.tdp}W TDP)</span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* GPU Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#00e5be]" />
              2. Placa de Vídeo (GPU)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {gpuOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedGpu(opt)}
                  className={`p-3 rounded-lg text-left text-xs transition-all border ${
                    selectedGpu.id === opt.id
                      ? 'bg-[#151c26] border-[#00e5be] text-white shadow-sm'
                      : 'bg-[#0c1017] border-[#243042] text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <p className="font-semibold text-white truncate">{opt.name}</p>
                  <p className="text-[#00e5be] font-mono font-bold mt-1">
                    R$ {opt.price.toLocaleString('pt-BR')} <span className="text-slate-500 font-normal text-[10px]">({opt.tdp}W TDP)</span>
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* RAM & Storage row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* RAM */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#00e5be]" />
                3. Memória RAM
              </label>
              <div className="space-y-1.5">
                {ramOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedRam(opt)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border ${
                      selectedRam.id === opt.id
                        ? 'bg-[#151c26] border-[#00e5be] text-white'
                        : 'bg-[#0c1017] border-[#243042] text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <p className="font-semibold text-white truncate">{opt.name}</p>
                    <p className="text-[#00e5be] font-mono font-bold">R$ {opt.price.toLocaleString('pt-BR')}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <HardDrive className="w-3.5 h-3.5 text-[#00e5be]" />
                4. Armazenamento SSD
              </label>
              <div className="space-y-1.5">
                {storageOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedStorage(opt)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border ${
                      selectedStorage.id === opt.id
                        ? 'bg-[#151c26] border-[#00e5be] text-white'
                        : 'bg-[#0c1017] border-[#243042] text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <p className="font-semibold text-white truncate">{opt.name}</p>
                    <p className="text-[#00e5be] font-mono font-bold">R$ {opt.price.toLocaleString('pt-BR')}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostics summary bar */}
          <div className="p-4 rounded-xl bg-[#151c26] border border-[#243042] grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-2 rounded bg-[#0c1017] border border-[#243042]/50">
              <span className="text-[11px] text-slate-400">Consumo Estimado (TDP)</span>
              <p className="text-sm font-bold text-white font-mono mt-0.5">{totalTdp} Watts</p>
            </div>
            <div className="p-2 rounded bg-[#0c1017] border border-[#243042]/50">
              <span className="text-[11px] text-slate-400">Fonte Recomendada</span>
              <p className="text-sm font-bold text-[#00e5be] font-mono mt-0.5">{recommendedPowerWatts}W Gold</p>
            </div>
            <div className="p-2 rounded bg-[#0c1017] border border-[#243042]/50">
              <span className="text-[11px] text-slate-400">Gabinete + Montagem</span>
              <p className="text-sm font-bold text-slate-200 font-mono mt-0.5">Incluso no cálculo</p>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-[#243042] bg-[#151c26] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400">Valor Total Estimado</span>
            <p className="text-2xl font-black text-[#00e5be] font-mono">
              R$ {totalEstimated.toLocaleString('pt-BR')},00
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleSendBuilderWhatsApp}
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-lg bg-[#00e5be] hover:bg-[#38ef7d] text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar Configuração para a Oficina</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
