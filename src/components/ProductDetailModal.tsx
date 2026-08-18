import React from 'react';
import { X, Check, ShoppingCart, MessageSquare, ShieldCheck, Truck } from 'lucide-react';
import { Product, CompanyInfo } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  company: CompanyInfo;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  company,
}) => {
  if (!product) return null;

  const handleWhatsAppDirect = () => {
    const text = `Olá! Gostaria de tirar dúvidas e comprar o produto *${product.title}* (${product.formattedPrice}) que vi no RK-03 APP.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${company.phoneRaw}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#0c1017] border border-[#243042] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10">
        
        {/* Header with Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#151c26]/80 text-slate-300 hover:text-white hover:bg-[#1e2836] transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-[#151c26] min-h-[260px] md:min-h-full flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover max-h-[360px]"
            />
            <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-xs font-semibold text-white">
              {product.locationBadge}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#00e5be] font-bold">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                {product.title}
              </h3>
              
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono">
                  {product.formattedPrice}
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Pronta Entrega
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {product.specs && product.specs.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#243042]">
                  <h5 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Destaques & Especificações:
                  </h5>
                  <ul className="space-y-1.5">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5be] mt-1.5 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-[#243042]">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="py-2.5 px-3 rounded-lg bg-[#151c26] border border-[#243042] text-white hover:bg-[#1e2836] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 text-[#00e5be]" />
                  <span>+ Carrinho</span>
                </button>

                <button
                  onClick={handleWhatsAppDirect}
                  className="py-2.5 px-3 rounded-lg bg-[#00e5be] hover:bg-[#38ef7d] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Comprar Agora</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00e5be]" /> Garantia RK-03
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-slate-400" /> Envio para todo o Brasil
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
