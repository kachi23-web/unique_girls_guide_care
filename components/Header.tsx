'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHostname, setCurrentHostname] = useState('');

  useEffect(() => {
    setCurrentHostname(window.location.origin);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 px-4">
      <div className="container mx-auto">
        <div className="rounded-3xl shadow-lg p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link href={`${currentHostname}/`}>
                  <Image
                    src="/ugg_logo.png"
                    alt="Unique Girls Guide Logo"
                    width={150}
                    height={50}
                    className="w-auto h-12"
                  />
                </Link>
              </div>
              <div className="md:hidden">
                <button onClick={toggleMenu} className="text-purple-600 hover:text-purple-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <nav className="hidden md:flex">
                <div className="flex flex-row items-center">
                  <Link href={`${currentHostname}/#about`} className="mx-2 text-purple-600 hover:text-purple-800">About Us</Link>
                  <Link href={`${currentHostname}/#project`} className="mx-2 text-purple-600 hover:text-purple-800">Project</Link>
                  <Link href={`${currentHostname}/#results`} className="mx-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">View Results</Link>
                </div>
              </nav>
            </div>
            <nav className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
              <div className="flex flex-col items-start">
                <Link href={`${currentHostname}/#about`} className="w-full py-2 text-purple-600 hover:text-purple-800">About Us</Link>
                <Link href={`${currentHostname}/#project`} className="w-full py-2 text-purple-600 hover:text-purple-800">Project</Link>
                <Link href={`${currentHostname}/#results`} className="w-full py-2 mt-2 bg-purple-600 text-white px-4 rounded-full hover:bg-purple-700 text-center">View Result</Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
