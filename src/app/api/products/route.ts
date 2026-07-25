import { NextResponse } from 'next/server';

const MOCK_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Farm Fresh Chicken - Curry Cut',
    slug: 'farm-fresh-chicken-curry-cut',
    category: 'Fresh Chicken',
    meatType: 'CHICKEN',
    pricePerKg: 320,
    netWeightGrams: 500,
    grossWeightGrams: 550,
    freshnessScore: 99,
    imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500',
    availableCuts: ['CURRY_CUT', 'BIRYANI_CUT', 'BONELESS', 'CHOPS'],
  },
  {
    id: 'prod_2',
    name: 'Tender Goat Mutton - Biryani Cut',
    slug: 'tender-goat-mutton-biryani-cut',
    category: 'Tender Mutton',
    meatType: 'MUTTON',
    pricePerKg: 780,
    netWeightGrams: 500,
    grossWeightGrams: 560,
    freshnessScore: 98,
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500',
    availableCuts: ['BIRYANI_CUT', 'CURRY_CUT', 'CHOPS', 'MINCE'],
  },
  {
    id: 'prod_3',
    name: 'Freshwater Rohu Fish - Large Slices',
    slug: 'freshwater-rohu-fish-slices',
    category: 'Fish & Seafood',
    meatType: 'FISH_SEAFOOD',
    pricePerKg: 440,
    netWeightGrams: 500,
    grossWeightGrams: 600,
    freshnessScore: 97,
    imageUrl: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500',
    availableCuts: ['CURRY_CUT', 'WHOLE', 'BONELESS'],
  },
  {
    id: 'prod_4',
    name: 'Marinated Peri-Peri Chicken Wings',
    slug: 'marinated-peri-peri-wings',
    category: 'Ready to Cook',
    meatType: 'READY_TO_COOK',
    pricePerKg: 360,
    netWeightGrams: 450,
    grossWeightGrams: 480,
    freshnessScore: 99,
    imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500',
    availableCuts: ['WHOLE'],
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_PRODUCTS,
  });
}
