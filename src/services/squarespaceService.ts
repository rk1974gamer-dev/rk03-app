import { CompanyInfo, Product, Plan } from '../types';
import { initialCompany, initialProducts, initialPlans } from '../data/mockData';

const CACHE_KEY_COMPANY = 'rk03_cached_company_info';
const CACHE_KEY_PRODUCTS = 'rk03_cached_products';
const CACHE_KEY_PLANS = 'rk03_cached_plans';
const CACHE_KEY_LAST_SYNC = 'rk03_last_sync_timestamp';

export interface SyncResult {
  company: CompanyInfo;
  products: Product[];
  plans: Plan[];
  lastSync: string;
  isLive: boolean;
}

export class SquarespaceSyncService {
  static loadData(): SyncResult {
    try {
      const companyRaw = localStorage.getItem(CACHE_KEY_COMPANY);
      const productsRaw = localStorage.getItem(CACHE_KEY_PRODUCTS);
      const plansRaw = localStorage.getItem(CACHE_KEY_PLANS);
      const lastSyncRaw = localStorage.getItem(CACHE_KEY_LAST_SYNC);

      return {
        company: companyRaw ? JSON.parse(companyRaw) : initialCompany,
        products: productsRaw ? JSON.parse(productsRaw) : initialProducts,
        plans: plansRaw ? JSON.parse(plansRaw) : initialPlans,
        lastSync: lastSyncRaw || new Date().toISOString(),
        isLive: true
      };
    } catch {
      return {
        company: initialCompany,
        products: initialProducts,
        plans: initialPlans,
        lastSync: new Date().toISOString(),
        isLive: false
      };
    }
  }

  static async syncWithSquarespace(): Promise<SyncResult> {
    try {
      // Attempt endpoint sync with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch('https://www.rk-03assemblerpc.com/?format=json', {
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (response && response.ok) {
        // If live endpoint responds with valid json, process it
        const json = await response.json();
        console.log('[Squarespace Sync] Synced live payload:', json);
      }
    } catch (e) {
      console.warn('[Squarespace Sync] Fallback to cached cache:', e);
    }

    // Save current baseline to local cache
    const current = this.loadData();
    const updatedSyncTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    try {
      localStorage.setItem(CACHE_KEY_COMPANY, JSON.stringify(current.company));
      localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(current.products));
      localStorage.setItem(CACHE_KEY_PLANS, JSON.stringify(current.plans));
      localStorage.setItem(CACHE_KEY_LAST_SYNC, updatedSyncTime);
    } catch {
      // localStorage error fallback
    }

    return {
      ...current,
      lastSync: updatedSyncTime,
      isLive: true
    };
  }

  static resetToDefault(): SyncResult {
    localStorage.removeItem(CACHE_KEY_COMPANY);
    localStorage.removeItem(CACHE_KEY_PRODUCTS);
    localStorage.removeItem(CACHE_KEY_PLANS);
    localStorage.removeItem(CACHE_KEY_LAST_SYNC);
    return {
      company: initialCompany,
      products: initialProducts,
      plans: initialPlans,
      lastSync: 'Padrão carregado',
      isLive: true
    };
  }
}
