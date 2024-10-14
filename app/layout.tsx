import './globals.css';
import Providers from '@/app/Providers';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Unique Girls Guide - Cooking Competition',
  description: 'Take girls off the streets and promoting morality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-gradient-to-b from-purple-50 to-white">
      <body className={`${inter.className} text-gray-900`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
