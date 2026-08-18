import React from 'react';
import {
  MessageSquare,
  Share2,
  ShoppingBag,
  Shield,
  Layers,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Activity,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { CompanyInfo, Product, Plan, SetupGalleryItem } from '../types';
import { ContactCard } from '../components/ContactCard';

interface HomeViewProps {
  company: CompanyInfo;
  products: Product[];
  plans: Plan[];
  setups: SetupGalleryItem[];
  onNavigate: (tab: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectPlan: (plan: Plan) => void;
  onSelectSetup: (setup: SetupGalleryItem) => void;
  onOpenPCBuilder: () => void;
  onOpenFPSCalc: () => void;
  onAddToCart: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  company,
  products,
  plans,
  setups,
  onNavigate,
  onSelectProduct,
  onSelectPlan,
  onSelectSetup,
  onOpenPCBuilder,
  onOpenFPSCalc,
  onAddToCart,
}) => {
  const handleShare = () => {
    const text = `Conheça a RK-03 Tech & Gaming PC! Montagem de computadores de alta performance, cadeiras e planos de suporte: ${company.website}`;
    if (navigator.share) {
      navigator.share({ title: company.name, text, url: company.website }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="space-y-10 pb-8">
      
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden border border-[#243042] bg-[#151c26]">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80"
            alt="Setup Gamer RK-03"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151c26] via-[#151c26]/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-5">
          
          {/* Avatar / Brand Icon & Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ff7a00] to-[#993300] flex items-center justify-center text-white shadow-lg border-2 border-[#243042]">
                <Cpu className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#1e2836] text-[11px] font-bold text-white uppercase tracking-wider border border-[#243042]">
                    Wix & Squarespace Sync
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {company.memberCount} membros ativos
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  {company.name}
                </h1>
              </div>
            </div>

            <button
              onClick={() => onNavigate('launcher')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0c1017] border border-[#00e5be]/40 text-[#00e5be] text-xs font-bold hover:bg-[#00e5be]/10 transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Abrir App Hub</span>
            </button>
          </div>

          {/* Subtitle & Bio */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#00e5be]">
              {company.subtitle}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {company.bio}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('store')}
              className="px-6 py-3 rounded-xl bg-[#00e5be] hover:bg-[#38ef7d] text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-lg shadow-[#00e5be]/15"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explorar Loja & Produtos</span>
            </button>

            <a
              href={company.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#1e2836] hover:bg-[#243042] border border-[#243042] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#00e5be]" />
              <span>WhatsApp Direto</span>
            </a>

            <button
              onClick={handleShare}
              className="px-4 py-3 rounded-xl bg-[#0c1017] border border-[#243042] text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              title="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
              <span>Convidar</span>
            </button>
          </div>

        </div>
      </section>

      {/* Quick Interactive Tools Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={onOpenPCBuilder}
          className="p-4 rounded-xl bg-[#151c26] border border-[#243042] hover:border-[#00e5be]/50 transition-all text-left flex items-center gap-3.5 group"
        >
          <div className="p-2.5 rounded-lg bg-[#0c1017] text-[#00e5be] group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white">Calculadora de Setup</h4>
            <p className="text-[11px] text-slate-400">Simule orçamento de peças e consumo TDP</p>
          </div>
        </button>

        <button
          onClick={onOpenFPSCalc}
          className="p-4 rounded-xl bg-[#151c26] border border-[#243042] hover:border-[#00e5be]/50 transition-all text-left flex items-center gap-3.5 group"
        >
          <div className="p-2.5 rounded-lg bg-[#0c1017] text-[#2979ff] group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white">Estimador de FPS</h4>
            <p className="text-[11px] text-slate-400">Veja a performance média em jogos AAA</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('plans')}
          className="p-4 rounded-xl bg-[#151c26] border border-[#243042] hover:border-[#00e5be]/50 transition-all text-left flex items-center gap-3.5 group"
        >
          <div className="p-2.5 rounded-lg bg-[#0c1017] text-[#ff7a00] group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white">Planos Prime & VIP</h4>
            <p className="text-[11px] text-slate-400">14 dias grátis de suporte e manutenção</p>
          </div>
        </button>
      </section>

      {/* Featured Products */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Destaques da Loja RK-03</h2>
            <p className="text-xs text-slate-400">Cadeiras ergonômicas, gabinetes gamer e periféricos</p>
          </div>
          <button
            onClick={() => onNavigate('store')}
            className="text-xs font-bold text-[#00e5be] hover:underline flex items-center gap-1"
          >
            <span>Ver catálogo completo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-[#151c26] rounded-xl border border-[#243042] overflow-hidden flex flex-col hover:border-slate-600 transition-all group"
            >
              {/* Product Image */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative h-44 bg-[#1e2836] cursor-pointer overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {product.locationBadge}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-3.5 flex flex-col flex-1 justify-between space-y-2">
                <div>
                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="text-xs font-semibold text-white line-clamp-2 hover:text-[#00e5be] cursor-pointer"
                  >
                    {product.title}
                  </h4>
                  <p className="text-sm font-bold text-white font-mono mt-1">
                    {product.formattedPrice}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 py-2 px-2.5 rounded-lg bg-[#1e2836] hover:bg-[#243042] border border-[#243042] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#00e5be]" />
                    <span>+ Carrinho</span>
                  </button>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="py-2 px-2.5 rounded-lg bg-[#0c1017] hover:bg-[#151c26] border border-[#243042] text-slate-300 text-xs font-medium transition-colors"
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Plans Highlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Planos de Manutenção & Suporte</h2>
            <p className="text-xs text-slate-400">Garantia contínua de performance e bancada técnica dedicada</p>
          </div>
          <button
            onClick={() => onNavigate('plans')}
            className="text-xs font-bold text-[#00e5be] hover:underline flex items-center gap-1"
          >
            <span>Ver todos os benefícios</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border transition-all relative ${
                plan.popular
                  ? 'bg-[#151c26] border-[#00e5be]/60 shadow-lg shadow-[#00e5be]/5'
                  : 'bg-[#151c26] border-[#243042]'
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-[#00e5be] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Mais Escolhido
                </span>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-black text-white">{plan.title}</h3>
                <p className="text-xs text-slate-300">{plan.description}</p>

                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-2xl font-extrabold text-[#00e5be] font-mono">
                    {plan.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <span className="text-xs text-slate-400">{plan.billingPeriod}</span>
                </div>

                <div className="pt-2 space-y-1.5">
                  {plan.benefits.slice(0, 3).map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5be] shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between gap-3 border-t border-[#243042]">
                  <span className="text-xs font-semibold text-[#00e5be]">{plan.trialPeriod}</span>
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className="py-2 px-4 rounded-lg bg-[#00e5be] hover:bg-[#38ef7d] text-black font-bold text-xs transition-colors"
                  >
                    Selecionar Plano
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Setups Gallery Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Galeria de Montagens Exclusivas</h2>
            <p className="text-xs text-slate-400">Projetos reais montados e calibrados pela RK-03</p>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="text-xs font-bold text-[#00e5be] hover:underline flex items-center gap-1"
          >
            <span>Ver galeria completa</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {setups.map((setup) => (
            <div
              key={setup.id}
              onClick={() => onSelectSetup(setup)}
              className="bg-[#151c26] rounded-xl border border-[#243042] overflow-hidden cursor-pointer hover:border-[#00e5be]/40 transition-all group"
            >
              <div className="h-44 bg-[#1e2836] overflow-hidden relative">
                <img
                  src={setup.image}
                  alt={setup.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-bold text-white font-mono">
                  {setup.estimatedPrice}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-bold text-white group-hover:text-[#00e5be] transition-colors">
                  {setup.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">{setup.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Card */}
      <ContactCard company={company} />

    </div>
  );
};
