import React, { useState } from 'react';
import { Search, ShoppingBag, Filter, RefreshCw, Check, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';

interface StoreViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSyncFresh: () => Promise<void>;
  isSyncing: boolean;
}

export const StoreView: React.FC<StoreViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onSyncFresh,
  isSyncing,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = [
    { id: 'all', label: 'Todos os Produtos' },
    { id: 'cadeiras', label: 'Cadeiras Ergonômicas' },
    { id: 'gabinetes', label: 'Gabinetes' },
    { id: 'perifericos', label: 'Periféricos & Acessórios' },
    { id: 'pcs', label: 'PCs Montados' },
  ];

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title & Sync Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#243042] pb-5">
        <div>
          <h1 className="text-2xl font-black text-white">Loja Oficial RK-03</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cadeiras ergonômicas, gabinetes, periféricos e peças com pronta entrega para todo o Brasil.
          </p>
        </div>

        <button
          onClick={onSyncFresh}
          disabled={isSyncing}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#151c26] border border-[#243042] text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#1e2836] transition-colors self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#00e5be] ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Squarespace'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por cadeiras, gabinetes, specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151c26] border border-[#243042] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00e5be]"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#151c26] border border-[#243042] rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-[#00e5be]"
            >
              <option value="default">Ordenar por: Relevância</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#00e5be] text-black font-bold'
                  : 'bg-[#151c26] text-slate-400 hover:text-white border border-[#243042]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="p-12 text-center bg-[#151c26] rounded-xl border border-[#243042] text-slate-400">
          <p className="text-sm font-semibold text-white">Nenhum produto encontrado</p>
          <p className="text-xs text-slate-500 mt-1">Tente remover os filtros ou buscar por outro termo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#151c26] rounded-xl border border-[#243042] overflow-hidden flex flex-col hover:border-slate-600 transition-all group"
            >
              {/* Image */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative h-48 bg-[#1e2836] cursor-pointer overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {product.locationBadge}
                </span>
                {product.inStock && (
                  <span className="absolute top-2.5 right-2.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                    Em estoque
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#00e5be]">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-xs font-bold text-white line-clamp-2 mt-1 hover:text-[#00e5be] cursor-pointer"
                  >
                    {product.title}
                  </h3>
                  <p className="text-base font-black text-white font-mono mt-2">
                    {product.formattedPrice}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#1e2836] hover:bg-[#243042] border border-[#243042] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#00e5be]" />
                    <span>+ Carrinho</span>
                  </button>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="py-2 px-3 rounded-lg bg-[#0c1017] hover:bg-[#151c26] border border-[#243042] text-slate-300 text-xs font-medium transition-colors"
                  >
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
