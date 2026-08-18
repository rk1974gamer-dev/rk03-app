export interface CompanyInfo {
  name: string;
  subtitle: string;
  bio: string;
  phone: string;
  phoneRaw: string;
  address: string;
  website: string;
  whatsAppUrl: string;
  mapsUrl: string;
  memberCount: number;
}

export interface Product {
  id: string;
  title: string;
  category: 'cadeiras' | 'gabinetes' | 'perifericos' | 'pcs';
  price: number;
  formattedPrice: string;
  imageUrl: string;
  locationBadge: string;
  description: string;
  inStock: boolean;
  specs?: string[];
  rating?: number;
}

export interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  billingPeriod: string;
  trialPeriod: string;
  cancellationText: string;
  popular?: boolean;
  benefits: string[];
  details: string;
}

export interface SetupGalleryItem {
  id: string;
  title: string;
  category: 'white' | 'dark' | 'workstation';
  desc: string;
  image: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    motherboard: string;
    cooling: string;
    case: string;
    power: string;
  };
  estimatedPrice: string;
  idealFor: string;
}

export interface LauncherAppItem {
  id: string;
  name: string;
  category: 'system' | 'gaming' | 'tools' | 'social';
  icon: string;
  description: string;
  actionType: 'link' | 'tool' | 'modal';
  target: string;
  badge?: string;
}

export interface CommunityGuide {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
  likes: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
