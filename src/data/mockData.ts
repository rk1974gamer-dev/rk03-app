import { CompanyInfo, Product, Plan, SetupGalleryItem, LauncherAppItem, CommunityGuide } from '../types';

export const initialCompany: CompanyInfo = {
  name: 'RK-03 APP',
  subtitle: 'Montagem de computador, PC Gamer, Workstation e Server PC',
  bio: 'A evolução dos seus equipamentos está aqui, com a RK-03 ASSEMBLER PC & PC Gamer!',
  phone: '(19) 996336407',
  phoneRaw: '19996336407',
  address: 'Av. Sen. Antônio Lacerda Franco, 1221 - Campinas, SP',
  website: 'https://www.rk-03assemblerpc.com',
  whatsAppUrl: 'https://wa.me/5519996336407?text=Ol%C3%A1!%20Vim%20pelo%20App%20Hub%20RK-03%20e%20gostaria%20de%20um%20or%C3%A7amento.',
  mapsUrl: 'https://maps.google.com/?q=Av.+Sen.+Antônio+Lacerda+Franco,+1221',
  memberCount: 43,
};

export const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Gaming Chair with Adjustable Lumbar Support RK Pro',
    category: 'cadeiras',
    price: 1735.89,
    formattedPrice: 'R$ 1.735,89',
    imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&q=80',
    locationBadge: 'Brasil',
    description: 'Cadeira ergonômica gamer com apoio lombar ajustável 4D, revestimento em couro sintético respirável premium, pistão classe 4 com inclinação de até 165° e rodízios silenciosos em poliuretano.',
    inStock: true,
    specs: ['Apoio lombar 4D integrado', 'Pistão a gás Classe 4', 'Inclinação 90° a 165°', 'Capacidade até 150kg'],
    rating: 4.9
  },
  {
    id: '2',
    title: 'Professional Gaming Office Chair with Adjustable Headrest',
    category: 'cadeiras',
    price: 876.89,
    formattedPrice: 'R$ 876,89',
    imageUrl: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&q=80',
    locationBadge: 'Brasil',
    description: 'Equilíbrio ideal entre escritório corporativo e setup gamer. Estrutura em mesh respirável de alta densidade com suporte cervical anatômico.',
    inStock: true,
    specs: ['Mesh respirável High-Density', 'Encosto cervical articulado', 'Braços com ajuste de altura', 'Base reforçada em nylon'],
    rating: 4.8
  },
  {
    id: '3',
    title: 'Multi-Use Portable Laptop Desk with Adjustable Height',
    category: 'perifericos',
    price: 336.89,
    formattedPrice: 'R$ 336,89',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
    locationBadge: 'Brasil',
    description: 'Mesa portátil multifuncional articulada em liga de alumínio aeronáutico com cooler integrado duplo USB e mousepad lateral desmontável.',
    inStock: true,
    specs: ['Estrutura articulada 360°', 'Cooler USB duplo integrado', 'Suporte lateral para mouse', 'Compatível até 17 polegadas'],
    rating: 4.7
  },
  {
    id: '4',
    title: 'Elite Seating: Premium Gaming & Office Essentials Desk',
    category: 'cadeiras',
    price: 1144.89,
    formattedPrice: 'R$ 1.144,89',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80',
    locationBadge: 'Brasil',
    description: 'Conjunto gamer refinado com assento de espuma moldada a frio e almofadas magnéticas com gel refrescante para longas jornadas de trabalho e gameplay.',
    inStock: true,
    specs: ['Almofadas com gel de resfriamento', 'Revestimento Soft Fabric', 'Mecanismo Frog multifuncional', 'Garantia estendida RK-03'],
    rating: 4.9
  },
  {
    id: '5',
    title: 'PC Gamer RK-03 Phantom Core i7 + RTX 4070 Ti Super',
    category: 'pcs',
    price: 9890.00,
    formattedPrice: 'R$ 9.890,00',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    locationBadge: 'Brasil',
    description: 'Máquina calibrada para alta taxa de quadros em 1440p e 4K. Montagem personalizada com cabos sleeving premium e teste de estresse de 24 horas.',
    inStock: true,
    specs: ['Intel Core i7 14700KF', 'GeForce RTX 4070 Ti Super 16GB', '32GB DDR5 6000MHz RGB', 'SSD 2TB NVMe Gen4 7000MB/s'],
    rating: 5.0
  },
  {
    id: '6',
    title: 'Gabinete Aquário RK Panoramic Dual Glass White',
    category: 'gabinetes',
    price: 649.90,
    formattedPrice: 'R$ 649,90',
    imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80',
    locationBadge: 'Brasil',
    description: 'Gabinete estilo aquário com vidro temperado duplo sem coluna frontal, permitindo visão 270° do hardware. Inclui 4 fans ARGB silenciosas.',
    inStock: true,
    specs: ['Vidro temperado 4mm sem coluna', 'Suporte a radiadores até 360mm', '4 Fans ARGB 120mm inclusos', 'Filtros magnéticos contra poeira'],
    rating: 4.9
  }
];

export const initialPlans: Plan[] = [
  {
    id: 'prime',
    title: 'Plano Prime',
    description: 'Perfeito para quem precisa de um PC intermediário com suporte ágil e manutenção preventiva contínua.',
    price: 24.90,
    billingPeriod: 'a cada 3 meses',
    trialPeriod: '14 dias de período gratuito',
    cancellationText: 'Cancele quando quiser, sem fidelidade',
    popular: false,
    benefits: [
      'Suporte prioritário na montagem e upgrade de máquinas',
      'Diagnóstico preventivo trimestral de temperaturas e hardware',
      'Descontos especiais de até 15% em peças e periféricos na loja',
      'Canal direto no WhatsApp para tirar dúvidas técnicas',
      'Orientação para otimização de drivers e sistema operacional'
    ],
    details: 'Ideal para gamers e profissionais que querem tranquilidade com o hardware rodando sempre em temperaturas e clocks perfeitos.'
  },
  {
    id: 'vip',
    title: 'Plano VIP Black',
    description: 'Perfeito para quem procura por tecnologia High-End, servidores ou workstations críticas com resposta imediata.',
    price: 38.90,
    billingPeriod: 'a cada mês',
    trialPeriod: '14 dias de período gratuito',
    cancellationText: 'Cancele quando quiser, sem fidelidade',
    popular: true,
    benefits: [
      'Atendimento VIP 24/7 direto com montador especialista sênior',
      'Overclocking seguro e calibração térmica de curva de fans',
      'Limpeza preventiva profunda e troca semestral de pasta térmica (Thermal Grizzly)',
      'Prioridade máxima na fila de montagem e bancada técnica',
      'Backup assistido e configuração de RAID/NAS',
      'Suporte remoto emergencial em menos de 30 minutos'
    ],
    details: 'Para streamers, criadores de conteúdo e empresas que não podem perder um minuto de produtividade ou FPS.'
  }
];

export const initialSetups: SetupGalleryItem[] = [
  {
    id: 'setup-1',
    title: 'Setup RK-03 Minimal White Edition',
    category: 'white',
    desc: 'Gabinete NZXT H9 Flow White, Water Cooler Lian Li Galahad II LCD, Cadeira Ergonômica White e iluminação Pastel Ciano sincronizada.',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80',
    specs: {
      cpu: 'AMD Ryzen 7 7800X3D (8 Cores / 16 Threads)',
      gpu: 'ASUS ROG Strix GeForce RTX 4080 White 16GB',
      ram: '64GB (2x32GB) Corsair Dominator Titanium DDR5 6000MHz',
      storage: '2TB Kingston Fury Renegade NVMe M.2 7300MB/s',
      motherboard: 'ASUS ROG B650-A Gaming WiFi White',
      cooling: 'Lian Li Galahad II LCD 360 White ARGB',
      case: 'NZXT H9 Flow White Dual Chamber',
      power: 'Corsair RM850 White 80 Plus Gold Modular'
    },
    estimatedPrice: 'R$ 18.450,00',
    idealFor: 'Gaming 4K Ultra, Live Streaming e Criação de Conteúdo'
  },
  {
    id: 'setup-2',
    title: 'Battle Station RK-03 Esport Dark',
    category: 'dark',
    desc: 'Múltiplos monitores curvos 240Hz, Core i9 14900KS + RTX 4090 refrigerado a líquido custom loop, teclado mecânico customizado.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    specs: {
      cpu: 'Intel Core i9 14900KS Special Edition 6.2GHz',
      gpu: 'MSI GeForce RTX 4090 Suprim Liquid X 24GB',
      ram: '96GB (2x48GB) G.Skill Trident Z5 RGB 7200MHz',
      storage: '4TB (2x2TB) Samsung 990 PRO NVMe PCIe 4.0',
      motherboard: 'ASUS ROG Maximus Z790 Dark Hero',
      cooling: 'Custom Loop EKWB Quantum Velocity + Radiador 420mm',
      case: 'Lian Li O11 Dynamic EVO XL Black',
      power: 'Seasonic Vertex GX-1200 ATX 3.0 1200W Gold'
    },
    estimatedPrice: 'R$ 32.900,00',
    idealFor: 'Competitivo E-Sports, Renderização 3D Pesada e VR'
  },
  {
    id: 'setup-3',
    title: 'Workstation & Servidor Deep Learning RK AI',
    category: 'workstation',
    desc: 'Dual RTX 4090 / Ada Lovelace, AMD Threadripper PRO, 256GB ECC RAM para inteligência artificial, render cinematográfico e simulações físicas.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
    specs: {
      cpu: 'AMD Ryzen Threadripper PRO 7965WX (24 Cores / 48 Threads)',
      gpu: 'Dual (2x) NVIDIA RTX 4090 24GB NVLink Ready',
      ram: '256GB (8x32GB) DDR5 ECC Registered Octa-Channel',
      storage: '8TB Enterprise NVMe U.2 + 20TB HDD RAID 10',
      motherboard: 'ASRock Creator WRX90 WS Workstation',
      cooling: 'Noctua NH-U14S TR5-SP6 Dual Fan Workstation Cooler',
      case: 'Fractal Design Define 7 XL Sound Dampening',
      power: 'Corsair AX1600i 1600W 80 Plus Titanium Digital'
    },
    estimatedPrice: 'R$ 54.800,00',
    idealFor: 'Treinamento de LLMs Locais, VFX, Engenharia e Servidores'
  }
];

export const initialLauncherApps: LauncherAppItem[] = [
  {
    id: 'app-pcbuilder',
    name: 'Calculadora de Setup',
    category: 'tools',
    icon: 'Cpu',
    description: 'Simule orçamentos de peças, compatibilidade de socket e fonte recomendada.',
    actionType: 'tool',
    target: 'builder',
    badge: 'Popular'
  },
  {
    id: 'app-bench',
    name: 'Estimador de FPS',
    category: 'gaming',
    icon: 'Activity',
    description: 'Verifique a taxa média de FPS nos jogos competitivos e AAA para sua configuração.',
    actionType: 'tool',
    target: 'fps-calc'
  },
  {
    id: 'app-lion',
    name: 'Monitor Agente Lion',
    category: 'system',
    icon: 'ShieldCheck',
    description: 'Acompanhe o status do robô de sincronização contínua e integridade do app.',
    actionType: 'tool',
    target: 'lion-monitor',
    badge: 'Ativo'
  },
  {
    id: 'app-whatsapp',
    name: 'WhatsApp VIP Direto',
    category: 'social',
    icon: 'MessageSquare',
    description: 'Chame nosso time técnico diretamente no WhatsApp com um único clique.',
    actionType: 'link',
    target: 'https://wa.me/5519996336407?text=Ol%C3%A1!%20Vim%20pelo%20Launcher%20RK-03'
  },
  {
    id: 'app-maps',
    name: 'Localização da Oficina',
    category: 'tools',
    icon: 'MapPin',
    description: 'Abrir no Google Maps o endereço em Campinas/SP para visita ou retirada.',
    actionType: 'link',
    target: 'https://maps.google.com/?q=Av.+Sen.+Antônio+Lacerda+Franco,+1221'
  },
  {
    id: 'app-squarespace',
    name: 'Portal Squarespace Web',
    category: 'system',
    icon: 'Globe',
    description: 'Acesse o site completo e a loja oficial rk-03assemblerpc.com.',
    actionType: 'link',
    target: 'https://www.rk-03assemblerpc.com'
  }
];

export const initialGuides: CommunityGuide[] = [
  {
    id: 'guide-1',
    title: 'Guia de Aplicação de Pasta Térmica: Gota vs X vs Espátula',
    author: 'Equipe Técnica RK-03',
    date: '14 de Agosto, 2026',
    readTime: '4 min',
    category: 'Manutenção',
    summary: 'Testamos diferentes métodos nos processadores Intel Core 14th Gen e Ryzen 7000 para definir a menor temperatura sob carga.',
    content: `A troca de pasta térmica periódica é fundamental para manter os processadores modernos operando em suas frequências de turbo boost máximas. Em processadores de IHS retangular (como LGA1700), o método em formato de "X fino" ou distribuição uniforme com espátula apresentou até 3°C a menos do que a tradicional gota central.`,
    likes: 38
  },
  {
    id: 'guide-2',
    title: 'Como escolher a Fonte de Alimentação (PSU) certa para a RTX 40 Series',
    author: 'Montador Especialista RK-03',
    date: '02 de Agosto, 2026',
    readTime: '6 min',
    category: 'Hardware',
    summary: 'Entenda os novos padrões ATX 3.0, conector 12VHPWR nativo e margem de segurança contra picos de transiente.',
    content: `Placas de vídeo da geração atual apresentam picos transitórios de microsegundos que podem acionar a proteção OCP de fontes antigas. Recomendamos sempre fontes com certificação Cybenetics Gold ou 80 Plus Gold e cabo 12V-2x6 nativo.`,
    likes: 45
  },
  {
    id: 'guide-3',
    title: 'Curva de Fans e Pressão Positiva no Gabinete',
    author: 'Laboratório RK-03',
    date: '28 de Julho, 2026',
    readTime: '5 min',
    category: 'Otimização',
    summary: 'Mantenha o interior livre de poeira e com fluxo de ar contínuo configurando fans de entrada com rotação levemente superior às de exaustão.',
    content: `Ao garantir que mais ar filtrado entra do que sai (pressão positiva), o ar tende a escapar pelas frestas naturais do gabinete, impedindo que poeira se acumule nos radiadores e aletas do dissipador.`,
    likes: 52
  }
];
