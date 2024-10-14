import { NextResponse } from 'next/server';
import { submitVote, verifyPaystackTransaction } from '@/libs/api';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference, chef_id, email, num_votes } = body;

    const verificationResponse = await verifyPaystackTransaction(reference);
    console.log('Paystack verification response:', verificationResponse);

    if (verificationResponse.status && verificationResponse.data.status === 'success') {
      await submitVote({
        chef_id,
        email,
        num_votes,
        amount_paid: verificationResponse.data.amount / 100, // Convert from kobo to naira
        reference,
      });

      return NextResponse.json({ success: true });
    } else {
      console.log('Payment verification failed:', verificationResponse);
      return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred', 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
