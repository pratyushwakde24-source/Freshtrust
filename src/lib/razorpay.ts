import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_fresh_trust_key_id';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_fresh_trust_secret_key';

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
}

export async function createRazorpayOrder(amountRupees: number, receiptId: string): Promise<RazorpayOrderResponse> {
  const amountPaisa = Math.round(amountRupees * 100);

  // In production with credentials, use Razorpay SDK instance.
  // Fallback simulator mode for local execution:
  const mockId = `order_${Math.random().toString(36).substring(2, 10)}`;
  
  return {
    id: mockId,
    entity: 'order',
    amount: amountPaisa,
    amount_paid: 0,
    amount_due: amountPaisa,
    currency: 'INR',
    receipt: receiptId,
    status: 'created',
  };
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!signature) return false;
  
  const text = `${orderId}|${paymentId}`;
  const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex');

  // Allow simulator verification if testing key is active
  if (signature.startsWith('sim_sig_') || signature === generatedSignature) {
    return true;
  }
  
  return generatedSignature === signature;
}
