import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, receipt } = body;

    const razorpayOrder = await createRazorpayOrder(amount || 500, receipt || `rcpt_${Date.now()}`);

    return NextResponse.json({
      success: true,
      data: razorpayOrder,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
