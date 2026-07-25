import { NextResponse } from 'next/server';

export async function GET() {
  const analyticsData = {
    totalRevenue: 2849200,
    dailyActiveOrders: 1420,
    activeShops: 18,
    activeLiveStreams: 14,
    avgDeliveryMins: 21.4,
    cityBreakdown: [
      { city: 'Mumbai', gmv: 1240000, shops: 8 },
      { city: 'Bengaluru', gmv: 980000, shops: 6 },
      { city: 'Delhi NCR', gmv: 629200, shops: 4 },
    ],
    recentOrders: [
      { id: 'FT-89102', customer: 'Pratyush S.', shop: 'BKC DarkStore', amount: 1000, status: 'LIVE_STREAMING' },
      { id: 'FT-89101', customer: 'Ananya R.', shop: 'Indiranagar Store', amount: 780, status: 'DISPATCHED' },
      { id: 'FT-89100', customer: 'Rohan K.', shop: 'Gurugram Sec 43', amount: 1450, status: 'DELIVERED' },
    ],
  };

  return NextResponse.json({
    success: true,
    data: analyticsData,
  });
}
