/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import PaystackPop from '@paystack/inline-js';

interface PaystackHandlerProps {
  email: string;
  numVotes: number;
  onSuccess: (transaction: any) => void;
  onClose: () => void;
  onError: (error: any) => void;
}

const PaystackHandler: React.FC<PaystackHandlerProps> = ({
  email,
  numVotes,
  onSuccess,
  onClose,
  onError,
}) => {
  const [loading, setLoading] = useState(false);

  const initializePaystackPayment = () => {
    const paystack = new PaystackPop();
    const paystackConfig = {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: numVotes * 100 * 100, // Each vote costs 100 NGN
      currency: 'NGN',
      reference: new Date().getTime().toString(),
      // subaccount: process.env.NEXT_PUBLIC_PAYSTACK_SUBACCOUNT,
      metadata: {
        custom_fields: [
          {
            display_name: 'Number of Votes',
            variable_name: 'num_votes',
            value: numVotes.toString(),
          },
        ],
      },
      onSuccess: (transaction: any) => {
        setLoading(true);
        onSuccess(transaction);
      },
      onCancel: () => {
        setLoading(false);
        onClose();
      },
      onError: (error: any) => {
        setLoading(false);
        onError(error);
      },
    };
    paystack.newTransaction(paystackConfig);
  };

  return (
    <button
      onClick={initializePaystackPayment}
      disabled={loading}
      className={`bg-purple-600 text-white px-4 py-2 rounded-[8px] hover:bg-purple-700 font-bold w-full ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Processing...' : `Pay ₦${numVotes * 100}`}
    </button>
  );
};

export default PaystackHandler;
