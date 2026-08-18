import React from 'react';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, CompanyInfo } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  company: CompanyInfo;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  company,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(subtotal);

  const handleSendWhatsAppOrder = () => {
    if (items.length === 0) return;

    let text = `*Orçamento de Produtos - RK-03 APP*\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. *${item.product.title}*\n`;
      text += `   Qtd: ${item.quantity}x | Preço: ${item.product.formattedPrice}\n\n`;
    });
    text += `*Valor Total Estimado: ${formattedTotal}*\n\n`;
    text += `Gostaria de confirmar a disponibilidade e forma de pagamento!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${company.phoneRaw}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c1017] border-l border-[#243042] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 border-b border-[#243042] flex items-center justify-between bg-[#151c26]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#00e5be]" />
              <h2 className="text-base font-bold text-white">Carrinho & Orçamento</h2>
              <span className="text-xs bg-[#1e2836] text-slate-300 px-2 py-0.5 rounded-full border border-[#243042]">
                {items.length} {items.length === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e2836] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-12 h-12 text-[#243042] mb-3" />
                <p className="text-sm font-semibold text-white">Seu carrinho está vazio</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Navegue pela loja RK-03 e adicione cadeiras ergonômicas, periféricos ou setups personalizados.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-[#151c26] rounded-lg border border-[#243042] p-3 flex gap-3 items-center"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-md bg-[#1e2836] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-[#00e5be] font-mono font-bold mt-0.5">
                      {item.product.formattedPrice}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#243042] rounded bg-[#0c1017]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-slate-400 hover:text-red-400 transition-colors ml-auto"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 border-t border-[#243042] bg-[#151c26] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400">Total estimado</span>
                <span className="text-lg font-bold text-white font-mono">{formattedTotal}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#00e5be] hover:bg-[#38ef7d] text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#00e5be]/10"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Orçamento via WhatsApp</span>
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full py-1.5 text-slate-400 hover:text-slate-200 text-xs font-medium"
                >
                  Limpar itens do carrinho
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
