import React, { useState } from 'react';
import { Shield, Check, ChevronDown, ChevronUp, Zap, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Plan, CompanyInfo } from '../types';

interface PlansViewProps {
  plans: Plan[];
  onSelectPlan: (plan: Plan) => void;
  company: CompanyInfo;
}

export const PlansView: React.FC<PlansViewProps> = ({
  plans,
  onSelectPlan,
  company,
}) => {
  // Matches original Flutter app: Map<String, bool> _expandedBenefits
  const [expandedBenefits, setExpandedBenefits] = useState<Record<string, boolean>>({
    prime: true,
    vip: true,
  });

  const toggleBenefits = (planId: string) => {
    setExpandedBenefits((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const comparisonItems = [
    { feature: 'Suporte prioritário via WhatsApp', prime: 'Horário Comercial', vip: '24/7 Direto com Montador' },
    { feature: 'Diagnóstico Preventivo', prime: 'Trimestral', vip: 'Mensal' },
    { feature: 'Desconto em Peças & Upgrades', prime: 'Até 10%', vip: 'Até 20%' },
    { feature: 'Limpeza e Troca de Pasta Térmica', prime: 'Anual', vip: 'Semestral (Thermal Grizzly)' },
    { feature: 'Calibração de Fans & Overclocking', prime: 'Básico', vip: 'Avançado / Custom Loop' },
    { feature: 'Prioridade na Bancada Técnica', prime: 'Fila Rápida', vip: 'Prioridade Máxima Imediata' },
    { feature: 'Período de Teste Gratuito', prime: '14 dias', vip: '14 dias' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151c26] border border-[#243042] text-[#00e5be] text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Assinaturas Periódicas de Manutenção</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Planos de Suporte Técnico & Performance
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Mantenha sua máquina sempre fria, atualizada e com máxima taxa de quadros (FPS) com suporte de especialistas.
        </p>
      </div>

      {/* Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isExpanded = expandedBenefits[plan.id] ?? false;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-[#151c26] border-[#00e5be] shadow-xl shadow-[#00e5be]/10 relative'
                  : 'bg-[#151c26] border-[#243042]'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 bg-[#00e5be] text-black font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Recomendado para Entusiastas
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white">{plan.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">{plan.description}</p>
                </div>

                {/* Price block */}
                <div className="p-4 rounded-xl bg-[#0c1017] border border-[#243042] space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#00e5be] font-mono">
                      {plan.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <span className="text-xs text-slate-400">{plan.billingPeriod}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[#00e5be] font-semibold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      {plan.trialPeriod}
                    </span>
                    <span className="text-slate-500">{plan.cancellationText}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan)}
                  className="w-full py-3 rounded-xl bg-[#00e5be] hover:bg-[#38ef7d] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#00e5be]/10"
                >
                  <span>Selecionar Plano {plan.title}</span>
                </button>

                {/* Toggle Accordion */}
                <button
                  onClick={() => toggleBenefits(plan.id)}
                  className="w-full py-2 flex items-center justify-between text-xs text-slate-400 hover:text-white border-t border-[#243042] pt-3 transition-colors"
                >
                  <span className="font-semibold">
                    {isExpanded ? 'Ocultar benefícios detalhados' : 'Mostrar benefícios detalhados'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Benefits List */}
                {isExpanded && (
                  <ul className="space-y-2.5 pt-2">
                    {plan.benefits.map((b, idx) => (
                      <li key={idx} className="text-xs text-slate-200 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00e5be] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-[#243042] text-[11px] text-slate-500 text-center">
                Ativação imediata sem burocracia ou taxa de adesão.
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto space-y-4 pt-6">
        <h2 className="text-lg font-bold text-white text-center">Comparativo de Recursos</h2>
        <div className="bg-[#151c26] rounded-2xl border border-[#243042] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0c1017] border-b border-[#243042] text-slate-400">
                <tr>
                  <th className="p-3.5 font-semibold">Benefício</th>
                  <th className="p-3.5 font-semibold text-center text-[#00e5be]">Plano Prime</th>
                  <th className="p-3.5 font-semibold text-center text-[#38ef7d]">Plano VIP Black</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#243042] text-slate-300">
                {comparisonItems.map((item, i) => (
                  <tr key={i} className="hover:bg-[#1e2836]/40 transition-colors">
                    <td className="p-3.5 font-medium text-white">{item.feature}</td>
                    <td className="p-3.5 text-center text-slate-300">{item.prime}</td>
                    <td className="p-3.5 text-center text-white font-semibold">{item.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
