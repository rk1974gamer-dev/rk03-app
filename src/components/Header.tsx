import React from 'react';
import { ShoppingCart, MessageSquare, Menu, X, Shield, Sparkles } from 'lucide-react';
import { CompanyInfo } from '../types';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  company: CompanyInfo;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  company,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'store', label: 'Loja' },
    { id: 'plans', label: 'Planos' },
    { id: 'gallery', label: 'Setups' },
    { id: 'launcher', label: 'App Hub' },
    { id: 'community', label: 'Dicas' },
    { id: 'lion', label: 'Agente Lion' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0c1017]/95 backdrop-blur-md border-b border-[#243042]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Title (One single text line/wordmark) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5be] rounded-md py-1"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#ff7a00] to-[#993300] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <span className="text-white text-xs font-mono font-bold tracking-tighter">RK-03</span>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white whitespace-nowrap">
              RK-03 <span className="text-[#00e5be]">APP</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5be] ${
                  isActive
                    ? 'bg-[#151c26] text-[#00e5be] font-semibold border border-[#243042]'
                    : 'text-slate-300 hover:text-white hover:bg-[#151c26]/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={company.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#151c26] border border-[#243042] text-xs font-semibold text-[#00e5be] hover:bg-[#1e2836] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp VIP</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-lg bg-[#151c26] border border-[#243042] text-slate-200 hover:text-[#00e5be] hover:bg-[#1e2836] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5be]"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00e5be] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-[#151c26] border border-[#243042] text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5be]"
            aria-label="Menu principal"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#243042] bg-[#0c1017] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-[#151c26] text-[#00e5be] font-bold'
                    : 'text-slate-300 hover:bg-[#151c26]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00e5be]" />}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#243042]/50 flex gap-2">
            <a
              href={company.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 text-center bg-[#00e5be] text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
