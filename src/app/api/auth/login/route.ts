import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const payload = {
      userId: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email,
      role: role || 'CUSTOMER',
      name: email.split('@')[0],
    };

    const token = generateToken(payload);

    return NextResponse.json({
      success: true,
      token,
      user: payload,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
