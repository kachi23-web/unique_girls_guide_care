/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin, message } from 'antd';
import { getChefById } from '@/libs/api';
import { Chef } from '@/libs/types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Heart, Mail, Hash } from 'lucide-react';

const PaystackHandler = dynamic(() => import('@/components/PaystackHandler'), { ssr: false });

export default function VotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [chef, setChef] = useState<Chef | null>(null);
  const [email, setEmail] = useState('');
  const [numVotes, setNumVotes] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const chefData = await getChefById(parseInt(params.id));
        setChef(chefData);
      } catch (error) {
        console.error('Error fetching chef:', error);
        message.error('Failed to load chef data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchChef();
  }, [params.id]);

  const handleVoteChange = (value: number) => {
    setNumVotes(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePaystackSuccess = async (transaction: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: transaction.reference,
          chef_id: chef?.id,
          email,
          num_votes: numVotes,
        }),
      });
      const result = await res.json();
      if (result.success) {
        message.success('Vote successfully submitted!');
        router.push('/');
      } else {
        message.error('Failed to submit vote. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackClose = () => {
    message.info('Payment was not completed.');
  };

  const handlePaystackError = (error: any) => {
    console.error('Paystack Error:', error);
    message.error('An error occurred during payment. Please try again.');
    setLoading(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container bg-white rounded-3xl shadow-xl overflow-hidden w-full mx-4">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 lg:p-12">
            <div className="flex items-center mb-8">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-purple-100 shadow-lg">
                <Image
                  src={chef?.image_url as string}
                  alt={chef?.name || 'Chef'}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h1 className="text-4xl font-bold ml-6 text-purple-900">{chef?.name}</h1>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">{chef?.description}</p>
            <div className="flex items-center text-2xl font-semibold text-purple-700">
              <Heart className="mr-3 text-pink-500" size={28} />
              <span>Total Votes: {chef?.votes}</span>
            </div>
          </div>
          <div className="md:w-1/2 bg-gradient-to-br from-purple-50 to-pink-50 p-8 lg:p-12">
            <h2 className="text-3xl font-bold mb-8 text-purple-900">Vote Now</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Mail className="mr-2" size={18} />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Hash className="mr-2" size={18} />
                  Number of Votes
                </label>
                <input
                  type="number"
                  min="1"
                  value={numVotes}
                  onChange={(e) => handleVoteChange(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                />
              </div>
              <div className="text-2xl font-semibold text-purple-700 flex items-center">
                Total Cost: ₦{numVotes * 100}
              </div>
              <PaystackHandler
                email={email}
                numVotes={numVotes}
                onSuccess={handlePaystackSuccess}
                onClose={handlePaystackClose}
                onError={handlePaystackError}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
