import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'azure-riviera',
    name: 'The Riviera Aviator',
    subtitle: 'Ultra-light surgical titanium with polarized cerulean gradient optics',
    price: 245,
    originalPrice: 280,
    category: 'Aviator',
    frameColor: 'Polished Silver',
    lensColor: 'Azure Gradient',
    description: 'Engineered for seamless coastal light transition. Crafted from Japanese aerospace titanium with handcrafted cellulose acetate temple tips and proprietary crystal lenses that eliminate 99.9% of glare.',
    details: [
      'Pure Grade-5 Japanese Titanium chassis',
      'Dual-side anti-reflective coating with hydrophobic seal',
      'Class 3 UV400 full-spectrum radiation protection',
      'Hand-adjusted silicone air-cushion nose pads',
      'Includes recycled microfiber cleaning cloth and vegan leather case'
    ],
    frameMaterial: 'Grade-5 Aerospace Titanium',
    lensType: 'Ultra-HD Polarized Polycarbonate with Sapphire Anti-Glare',
    dimensions: {
      lensWidth: 55,
      bridgeWidth: 16,
      templeLength: 145,
    },
    polarized: true,
    uvProtection: 'UV400 (100% UVA/UVB)',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 142,
    isBestseller: true,
    isNew: false,
    colorways: [
      {
        name: 'Cobalt Silver',
        colorHex: '#38bdf8',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Ocean Matte Gold',
        colorHex: '#d97706',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Obsidian Chrome',
        colorHex: '#1e293b',
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
      }
    ],
    inStock: true,
  },
  {
    id: 'monaco-square',
    name: 'Monaco Bold Square',
    subtitle: 'Sculpted Italian bio-acetate with oceanic deep tint',
    price: 215,
    category: 'Square',
    frameColor: 'Deep Marine Blue',
    lensColor: 'Smoked Indigo',
    description: 'An architectural silhouette defined by beveled edges and 8mm hand-tumbled Italian acetate. Designed for commanding presence and uncompromising optical sharpness in high-glare environments.',
    details: [
      'Custom 7-barrel German engineered barrel hinges',
      'Hand-engraved wire core with maritime micro-groove pattern',
      'Oleophobic lens surface repels water, sweat, and fingerprints',
      'Hypoallergenic plant-based cellulose acetate from Lombardy, Italy'
    ],
    frameMaterial: 'Mazzucchelli 1849 Bio-Acetate',
    lensType: 'Category 3 Polarized CR-39 Optical Glass',
    dimensions: {
      lensWidth: 52,
      bridgeWidth: 20,
      templeLength: 145,
    },
    polarized: true,
    uvProtection: 'UV400 Category 3',
    images: [
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.8,
    reviewCount: 98,
    isBestseller: true,
    isNew: true,
    colorways: [
      {
        name: 'Marine Crystal',
        colorHex: '#0284c7',
        image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Tortoise Havana',
        colorHex: '#78350f',
        image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Solid Onyx',
        colorHex: '#0f172a',
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80',
      }
    ],
    inStock: true,
  },
  {
    id: 'capri-round',
    name: 'Capri Minimalist Round',
    subtitle: 'Featherlight wire-rim frame with cyan mirror clarity',
    price: 195,
    originalPrice: 220,
    category: 'Round',
    frameColor: 'Brushed Silver',
    lensColor: 'Ice Cyan Mirror',
    description: 'A poetic ode to mid-century Mediterranean modernism. Ultra-fine stainless steel profiles frame perfectly calibrated circular lenses with a blue flash reflection that shields tired eyes.',
    details: [
      'Laser-welded surgical steel wire with flex-temple architecture',
      'Curved bridge designed for universal bridge fit',
      'Back-surface anti-reflective treatment reduces ambient glare',
      'Weighs merely 19 grams for all-day weightless comfort'
    ],
    frameMaterial: 'Surgical Stainless Steel & Beta Titanium',
    lensType: 'Impact-Resistant Nylon Optical Lens',
    dimensions: {
      lensWidth: 49,
      bridgeWidth: 21,
      templeLength: 140,
    },
    polarized: true,
    uvProtection: 'UV400 (100% Protection)',
    images: [
      'https://images.unsplash.com/photo-1509695503495-7ddc408442ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.7,
    reviewCount: 86,
    isBestseller: false,
    isNew: false,
    colorways: [
      {
        name: 'Cyan Brushed Silver',
        colorHex: '#38bdf8',
        image: 'https://images.unsplash.com/photo-1509695503495-7ddc408442ab?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Champagne Gold',
        colorHex: '#fbbf24',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
      }
    ],
    inStock: true,
  },
  {
    id: 'saint-tropez-cat-eye',
    name: 'Saint-Tropez Cat-Eye',
    subtitle: 'Sharp contemporary uplift with soft azure gradient lenses',
    price: 230,
    category: 'Cat-Eye',
    frameColor: 'Chalk White & Ice Blue',
    lensColor: 'Azure Mist Gradient',
    description: 'Refined glamour stripped of excess ornamentation. Features high geometric angles that contour cheekbones, paired with translucent chalk acetate that glows subtly in direct sunlight.',
    details: [
      'Beveled browline with razor-sharp micro-contouring',
      'Hand-finished with organic botanical tumbling stones',
      'Reinforced core wire with custom Milenwears serial numbering',
      'Gradient optical lens ideal for driving and open water'
    ],
    frameMaterial: 'Premium Hand-Cast Cellulose Acetate',
    lensType: 'Scratch-Proof Gradient CR-39 Lens',
    dimensions: {
      lensWidth: 53,
      bridgeWidth: 18,
      templeLength: 142,
    },
    polarized: true,
    uvProtection: 'UV400',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 114,
    isBestseller: true,
    isNew: true,
    colorways: [
      {
        name: 'Chalk & Azure',
        colorHex: '#e0f2fe',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Midnight Navy',
        colorHex: '#1e3a8a',
        image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Pure Ivory',
        colorHex: '#f8fafc',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      }
    ],
    inStock: true,
  },
  {
    id: 'amalfi-hexagon',
    name: 'Amalfi Geometric Hexagon',
    subtitle: 'Architectural octagonal frame with sea-glass blue lens',
    price: 210,
    category: 'Geometric',
    frameColor: 'Polished Palladium',
    lensColor: 'Sea Glass Blue',
    description: 'Crisp polygonal profile balancing modern edge with understated subtlety. Precision diamond-cut rims capture light at calculated angles while framing your eyes with crystalline clarity.',
    details: [
      'Diamond-cut geometric rim profile',
      'Hypoallergenic ceramic nose pads with micro-pivoting stem',
      'Anti-static lens coating repels marine salt spray and dust',
      'Custom knurled temple tips for secure grip'
    ],
    frameMaterial: 'Palladium Plated Stainless Steel',
    lensType: 'Ultra-Clarity Tinted Glass Optics',
    dimensions: {
      lensWidth: 51,
      bridgeWidth: 20,
      templeLength: 145,
    },
    polarized: false,
    uvProtection: 'UV400 100% UVA/UVB',
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.6,
    reviewCount: 63,
    isBestseller: false,
    isNew: true,
    colorways: [
      {
        name: 'Palladium Blue',
        colorHex: '#0ea5e9',
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Matte Gunmetal',
        colorHex: '#475569',
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80',
      }
    ],
    inStock: true,
  },
  {
    id: 'biarritz-shield',
    name: 'Biarritz Coastal Shield',
    subtitle: 'Panoramic single-lens performance with luxury minimalism',
    price: 260,
    originalPrice: 295,
    category: 'Shield',
    frameColor: 'Cobalt Semi-Rimless',
    lensColor: 'Deep Ocean Blue Revo',
    description: 'Born for open water sailing, shoreline cycling, and high-altitude sunlight. A frameless continuous cylindrical shield lens provides unbroken 180-degree visual clarity and wind deflection.',
    details: [
      'Continuous toric cylindrical lens geometry',
      'TR-90 memory polymer temples with soft-touch grip',
      'Hydrophobic and oleophobic dual-shield coatings',
      'Vented brow channel to eliminate fogging in humid climates'
    ],
    frameMaterial: 'TR90 Swiss Grilamid & Frameless Polycarbonate',
    lensType: 'Revo Multi-Layer Mirror Hydrophobic Shield',
    dimensions: {
      lensWidth: 138,
      bridgeWidth: 14,
      templeLength: 135,
    },
    polarized: true,
    uvProtection: 'UV400 + Blue Light Filter',
    images: [
      'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 75,
    isBestseller: false,
    isNew: true,
    colorways: [
      {
        name: 'Electric Cobalt',
        colorHex: '#2563eb',
        image: 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Glacier Silver',
        colorHex: '#94a3b8',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      }
    ],
    inStock: true,
  },
  {
    id: 'aegean-wayfarer',
    name: 'The Aegean Classic',
    subtitle: 'The timeless silhouette elevated with modern blue accents',
    price: 185,
    category: 'Square',
    frameColor: 'Deep Marine Tortoise',
    lensColor: 'Classic Slate Gray with Blue Tint',
    description: 'An iconic silhouette refined for the modern purist. Subtle blue flecks within our bespoke tortoiseshell acetate react to direct sunlight, providing a dynamic shift in color between indoors and outdoors.',
    details: [
      'Hand-poured bespoke blue tortoiseshell cellulose',
      'Custom rivet pins embedded into front and temples',
      'Multi-layer polarization cuts water and road glare',
      'Balanced weight distribution for fatigue-free wear'
    ],
    frameMaterial: 'Italian Bio-Based Acetate',
    lensType: 'Category 3 Polarized CR-39 Lens',
    dimensions: {
      lensWidth: 50,
      bridgeWidth: 22,
      templeLength: 145,
    },
    polarized: true,
    uvProtection: 'UV400 Category 3',
    images: [
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.8,
    reviewCount: 205,
    isBestseller: true,
    isNew: false,
    colorways: [
      {
        name: 'Aegean Blue Tortoise',
        colorHex: '#1d4ed8',
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Matte Navy',
        colorHex: '#172554',
        image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80',
      }
    ],
    inStock: true,
  },
  {
    id: 'kyoto-round-titanium',
    name: 'Kyoto Beta Round',
    subtitle: 'Ultralight Japanese titanium with indigo mirrored crystal',
    price: 275,
    category: 'Round',
    frameColor: 'Brushed Slate & Titanium',
    lensColor: 'Indigo Blue Mirror',
    description: 'Forged in Sabae, Japan—the world capital of titanium optics. Seamlessly flexes to match your temple contours, weighing a mere 16 grams without sacrificing durability or structural poise.',
    details: [
      '100% Japanese Beta-Titanium construction',
      'Screwless micro-barrel hinge system that never loosens',
      'Laser-etched individual serial numbering',
      'Hydrophobic anti-fog coating on inner lens'
    ],
    frameMaterial: 'Japanese Beta-Titanium',
    lensType: 'Diamond-Coated Polycarbonate Polarized',
    dimensions: {
      lensWidth: 48,
      bridgeWidth: 21,
      templeLength: 142,
    },
    polarized: true,
    uvProtection: 'UV400 (100% UVA/B/C)',
    images: [
      'https://images.unsplash.com/photo-1509695503495-7ddc408442ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 5.0,
    reviewCount: 52,
    isBestseller: false,
    isNew: true,
    colorways: [
      {
        name: 'Brushed Titanium',
        colorHex: '#64748b',
        image: 'https://images.unsplash.com/photo-1509695503495-7ddc408442ab?auto=format&fit=crop&w=1000&q=80',
      },
      {
        name: 'Deep Sea Blue',
        colorHex: '#0284c7',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      }
    ],
    inStock: true,
  }
];
