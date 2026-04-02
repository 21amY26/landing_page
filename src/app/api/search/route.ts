import { NextRequest, NextResponse } from 'next/server';
import { FulfillmentProduct } from '@/lib/types';

// Using stable Unsplash images to prevent 403 hotlinking bans from Amazon/Blinkit CDN
const IMAGES = {
  pills: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
  bandage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&q=80',
  liquid: 'https://images.unsplash.com/photo-1583947581924-860bda6a44fd?w=300&q=80',
  syrup: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&q=80',
  generic: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&q=80'
};

const SEARCH_DATABASE: Record<string, FulfillmentProduct[]> = {
  paracetamol: [
    {
      id: 'ama-dolo650',
      name: 'Dolo 650 Tablet (15 Strips)',
      platform: 'Amazon',
      price: 33.15,
      originalPrice: 34.0,
      imageUrl: IMAGES.pills,
      addToCartUrl: 'https://www.amazon.in/gp/aws/cart/add.html?ASIN.1=B07T999999&Quantity.1=1',
      deliveryTime: 'Tomorrow by 2 PM',
    },
    {
      id: 'bli-crocin500',
      name: 'Crocin Advance 500mg',
      platform: 'Blinkit',
      price: 20.0,
      imageUrl: IMAGES.pills,
      addToCartUrl: 'https://blinkit.com/s/?q=crocin',
      deliveryTime: '10 Mins',
    },
    {
      id: '1mg-paracip',
      name: 'Paracip 500 Tablet',
      platform: 'Tata 1mg',
      price: 15.50,
      originalPrice: 17.0,
      imageUrl: IMAGES.pills,
      addToCartUrl: 'https://www.1mg.com/search/all?name=paracetamol',
      deliveryTime: 'Today by 8 PM',
    },
    {
      id: 'zep-dolo650',
      name: 'Dolo 650mg Quick Relief',
      platform: 'Zepto',
      price: 33.10,
      imageUrl: IMAGES.pills,
      addToCartUrl: 'https://www.zeptonow.com/search?q=dolo',
      deliveryTime: '8 Mins',
    }
  ],
  bandage: [
    {
      id: 'ama-crepe',
      name: 'Cotton Crepe Bandage (8cm)',
      platform: 'Amazon',
      price: 185.0,
      originalPrice: 200.0,
      imageUrl: IMAGES.bandage,
      addToCartUrl: 'https://www.amazon.in/gp/aws/cart/add.html?ASIN.1=B08HVPBN3P&Quantity.1=1',
      deliveryTime: 'Today by 10 PM',
    },
    {
      id: 'bli-crepe',
      name: 'First Aid Crepe Bandage',
      platform: 'Blinkit',
      price: 199.0,
      originalPrice: 220.0,
      imageUrl: IMAGES.bandage,
      addToCartUrl: 'https://blinkit.com/s/?q=bandage',
      deliveryTime: '10 Mins',
    },
    {
      id: 'zep-bandaid',
      name: 'Waterproof Band Aids (100 Washproof)',
      platform: 'Zepto',
      price: 90.0,
      imageUrl: IMAGES.bandage,
      addToCartUrl: 'https://www.zeptonow.com/search?q=bandage',
      deliveryTime: '9 Mins',
    },
    {
      id: '1mg-crepe',
      name: 'Apollo Pharmacy Crepe Bandage',
      platform: 'Tata 1mg',
      price: 155.0,
      originalPrice: 180.0,
      imageUrl: IMAGES.bandage,
      addToCartUrl: 'https://www.1mg.com/search/all?name=bandage',
      deliveryTime: 'Tomorrow by 11 AM',
    }
  ],
  antiseptic: [
    {
      id: 'bli-dettol',
      name: 'Dettol Antiseptic Liquid (250ml)',
      platform: 'Blinkit',
      price: 110.0,
      originalPrice: 118.0,
      imageUrl: IMAGES.liquid,
      addToCartUrl: 'https://blinkit.com/s/?q=antiseptic',
      deliveryTime: '8 Mins',
    },
    {
      id: 'ama-savlon',
      name: 'Savlon Antiseptic Disinfectant Liquid 1000ml',
      platform: 'Amazon',
      price: 310.0,
      imageUrl: IMAGES.liquid,
      addToCartUrl: 'https://www.amazon.in/gp/aws/cart/add.html?ASIN.1=B01MT1V19Y&Quantity.1=1',
      deliveryTime: 'Tomorrow by 9 AM',
    },
    {
      id: '1mg-betadine',
      name: 'Betadine 10% Solution',
      platform: 'Tata 1mg',
      price: 85.0,
      imageUrl: IMAGES.liquid,
      addToCartUrl: 'https://www.1mg.com/search/all?name=betadine',
      deliveryTime: 'Today by 8 PM',
    }
  ],
  cough: [
    {
      id: 'bli-honitus',
      name: 'Dabur Honitus Cough Syurp (100ml)',
      platform: 'Blinkit',
      price: 125.0,
      imageUrl: IMAGES.syrup,
      addToCartUrl: 'https://blinkit.com/s/?q=cough%20syrup',
      deliveryTime: '10 Mins',
    },
    {
      id: 'ama-benadryl',
      name: 'Benadryl Cough Formula 150ml',
      platform: 'Amazon',
      price: 140.0,
      imageUrl: IMAGES.syrup,
      addToCartUrl: 'https://www.amazon.in/gp/aws/cart/add.html?ASIN.1=B07T999998&Quantity.1=1',
      deliveryTime: 'Tomorrow',
    },
    {
      id: 'zep-cofsils',
      name: 'Cofsils Naturals Cough Syrup',
      platform: 'Zepto',
      price: 95.0,
      originalPrice: 110.0,
      imageUrl: IMAGES.syrup,
      addToCartUrl: 'https://www.zeptonow.com/search?q=cough',
      deliveryTime: '11 Mins',
    }
  ]
};

// Fallback generator for un-mapped search terms
function generateGenericProducts(query: string): FulfillmentProduct[] {
  const capQuery = query.charAt(0).toUpperCase() + query.slice(1);
  return [
    {
      id: `ama-gen-${Math.random()}`,
      name: `${capQuery} - Healthcare Standard Edition`,
      platform: 'Amazon',
      price: Math.floor(Math.random() * 500) + 150,
      imageUrl: IMAGES.generic,
      addToCartUrl: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
      deliveryTime: 'Next Day',
    },
    {
      id: `bli-gen-${Math.random()}`,
      name: `${capQuery} Essentials`,
      platform: 'Blinkit',
      price: Math.floor(Math.random() * 500) + 100,
      imageUrl: IMAGES.generic,
      addToCartUrl: `https://blinkit.com/s/?q=${encodeURIComponent(query)}`,
      deliveryTime: '12 Mins',
    },
    {
      id: `zep-gen-${Math.random()}`,
      name: `${capQuery} Quick Pack`,
      platform: 'Zepto',
      price: Math.floor(Math.random() * 500) + 80,
      imageUrl: IMAGES.generic,
      addToCartUrl: `https://www.zeptonow.com/search?q=${encodeURIComponent(query)}`,
      deliveryTime: '9 Mins',
    },
    {
      id: `1mg-gen-${Math.random()}`,
      name: `Pharm ${capQuery}`,
      platform: 'Tata 1mg',
      price: Math.floor(Math.random() * 500) + 50, // Usually cheapest
      imageUrl: IMAGES.generic,
      addToCartUrl: `https://www.1mg.com/search/all?name=${encodeURIComponent(query)}`,
      deliveryTime: 'Tomorrow',
    }
  ];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter q is required' }, { status: 400 });
  }

  // Simulate network delay for realistic experience
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  let results: FulfillmentProduct[] = [];

  // Keyword matching
  let matched = false;
  for (const [key, products] of Object.entries(SEARCH_DATABASE)) {
    if (query.includes(key)) {
      results = products;
      matched = true;
      break;
    }
  }

  if (!matched) {
    results = generateGenericProducts(query);
  }

  // CORE REQUEST: Rank according to price for users automatically
  results.sort((a, b) => a.price - b.price);

  return NextResponse.json({ results });
}
