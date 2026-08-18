import React from 'react';
import { X, Check, Shield, MessageSquare, Zap, Clock } from 'lucide-react';
import { Plan, CompanyInfo } from '../types';

interface PlanDetailModalProps {
  plan: Plan | null;
  onClose: () => void;
  company: CompanyInfo;
  onSelectSuccess: (planTitle: string) => void;
}

export const PlanDetailModal: React.FC<PlanDetailModalProps> = ({
  plan,
  onClose,
  company,
  onSelectSuccess,
}) => {
  if (!plan) return null;

  const handleSubscribeWhatsApp = () => {
    const text = `Olá! Tenho interesse em assinar o *${plan.title}* (${plan.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ${plan.billingPeriod}) com 14 dias grátis de suporte técnico no RK-03 APP.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${company.phoneRaw}?text=${encoded}`, '_blank');
    onSelectSuccess(plan.title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#0c1017] border border-[#243042] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl z-10 p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-[#1e2836] text-[#00e5be]">
                <Shield className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-extrabold text-white">{plan.title}</h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">{plan.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#151c26] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing card */}
        <div className="p-4 rounded-xl bg-[#151c26] border border-[#243042] space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black text-[#00e5be] font-mono">
                {plan.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <span className="text-xs text-slate-400 ml-1.5">{plan.billingPeriod}</span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#00e5be]/10 text-[#00e5be] border border-[#00e5be]/30">
              {plan.trialPeriod}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{plan.cancellationText}</span>
          </div>
        </div>

        {/* Benefits Breakdown */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Benefícios Inclusos no Plano:
          </h4>
          <ul className="space-y-2 bg-[#0c1017] p-3 rounded-lg border border-[#243042]/70">
            {plan.benefits.map((b, i) => (
              <li key={i} className="text-xs text-slate-200 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00e5be] shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-400 italic bg-[#151c26]/50 p-2.5 rounded border border-[#243042]/50">
          💡 {plan.details}
        </p>

        {/* Action Button */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleSubscribeWhatsApp}
            className="w-full py-3 px-4 rounded-xl bg-[#00e5be] hover:bg-[#38ef7d] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#00e5be]/10"
          >
            <Zap className="w-4 h-4" />
            <span>Ativar Período Gratuito de 14 Dias</span>
          </button>
          <p className="text-center text-[11px] text-slate-500">
            Sem cobrança prévia. Ativação direta com nossa equipe no WhatsApp.
          </p>
        </div>

      </div>
    </div>
  );
};
