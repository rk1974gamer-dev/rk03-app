import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PlanDetailModal } from './components/PlanDetailModal';
import { SetupDetailModal } from './components/SetupDetailModal';
import { PCBuilderModal } from './components/PCBuilderModal';
import { FPSCalculatorModal } from './components/FPSCalculatorModal';

import { HomeView } from './views/HomeView';
import { StoreView } from './views/StoreView';
import { PlansView } from './views/PlansView';
import { GalleryView } from './views/GalleryView';
import { LauncherHubView } from './views/LauncherHubView';
import { CommunityView } from './views/CommunityView';
import { LionAgentView } from './views/LionAgentView';

import {
  CompanyInfo,
  Product,
  Plan,
  SetupGalleryItem,
  LauncherAppItem,
  CartItem
} from './types';
import {
  initialCompany,
  initialProducts,
  initialPlans,
  initialSetups,
  initialLauncherApps
} from './data/mockData';
import { SquarespaceSyncService } from './services/squarespaceService';
import { CheckCircle2, X } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [company, setCompany] = useState<CompanyInfo>(initialCompany);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [setups] = useState<SetupGalleryItem[]>(initialSetups);
  const [launcherApps] = useState<LauncherAppItem[]>(initialLauncherApps);

  const [lastSync, setLastSync] = useState<string>('Inicializado');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rk03_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedSetup, setSelectedSetup] = useState<SetupGalleryItem | null>(null);
  const [isPCBuilderOpen, setIsPCBuilderOpen] = useState<boolean>(false);
  const [isFPSCalcOpen, setIsFPSCalcOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync Data on Mount
  useEffect(() => {
    const loaded = SquarespaceSyncService.loadData();
    setCompany(loaded.company);
    setProducts(loaded.products);
    setPlans(loaded.plans);
    setLastSync(loaded.lastSync);
  }, []);

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rk03_cart_items', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const handleSyncFresh = async () => {
    setIsSyncing(true);
    try {
      const res = await SquarespaceSyncService.syncWithSquarespace();
      setCompany(res.company);
      setProducts(res.products);
      setPlans(res.plans);
      setLastSync(res.lastSync);
      showToast('Dados e catálogo sincronizados com sucesso!');
    } catch (e) {
      showToast('Sincronização concluída com cache local seguro.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Adicionado ao carrinho: ${product.title}`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Carrinho limpo com sucesso.');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#0c1017] text-slate-100 antialiased">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        company={company}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'home' && (
          <HomeView
            company={company}
            products={products}
            plans={plans}
            setups={setups}
            onNavigate={setCurrentTab}
            onSelectProduct={setSelectedProduct}
            onSelectPlan={setSelectedPlan}
            onSelectSetup={setSelectedSetup}
            onOpenPCBuilder={() => setIsPCBuilderOpen(true)}
            onOpenFPSCalc={() => setIsFPSCalcOpen(true)}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentTab === 'store' && (
          <StoreView
            products={products}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onSyncFresh={handleSyncFresh}
            isSyncing={isSyncing}
          />
        )}

        {currentTab === 'plans' && (
          <PlansView
            plans={plans}
            onSelectPlan={setSelectedPlan}
            company={company}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryView
            setups={setups}
            onSelectSetup={setSelectedSetup}
            company={company}
          />
        )}

        {currentTab === 'launcher' && (
          <LauncherHubView
            apps={launcherApps}
            company={company}
            onOpenPCBuilder={() => setIsPCBuilderOpen(true)}
            onOpenFPSCalc={() => setIsFPSCalcOpen(true)}
            onOpenLion={() => setCurrentTab('lion')}
          />
        )}

        {currentTab === 'community' && <CommunityView company={company} />}

        {currentTab === 'lion' && (
          <LionAgentView
            company={company}
            lastSync={lastSync}
            onSyncFresh={handleSyncFresh}
            isSyncing={isSyncing}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        company={company}
        onOpenLion={() => setCurrentTab('lion')}
        lastSync={lastSync}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        company={company}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        company={company}
      />

      <PlanDetailModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
        company={company}
        onSelectSuccess={(title) =>
          showToast(`Plano ${title} ativado com sucesso!`)
        }
      />

      <SetupDetailModal
        setup={selectedSetup}
        onClose={() => setSelectedSetup(null)}
        company={company}
      />

      <PCBuilderModal
        isOpen={isPCBuilderOpen}
        onClose={() => setIsPCBuilderOpen(false)}
        company={company}
      />

      <FPSCalculatorModal
        isOpen={isFPSCalcOpen}
        onClose={() => setIsFPSCalcOpen(false)}
        company={company}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#151c26] border border-[#00e5be]/60 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#00e5be] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
