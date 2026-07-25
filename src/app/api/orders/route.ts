import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, address, paymentMethod, totalAmount } = body;

    const orderId = 'FT-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      id: orderId,
      orderNumber: orderId,
      status: 'PREPARING',
      liveStreamActive: true,
      items: items || [],
      address: address || 'Apartment 4B, BKC, Mumbai',
      paymentMethod: paymentMethod || 'RAZORPAY',
      totalAmount: totalAmount || 640,
      deliveryFee: 0,
      finalAmount: totalAmount || 640,
      deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      estimatedMins: 24,
      worker: {
        name: 'Ramesh Master',
        station: 'Cutting Station 1 - BKC Store',
        cameraStreamKey: 'CAM-BKC-STATION-1',
      },
      rider: {
        name: 'Vikram Rider',
        vehicle: 'Ather EV (MH-02-FT-4092)',
        phone: '+919988776655',
      },
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newOrder,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
