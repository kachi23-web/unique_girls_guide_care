'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [currentHostname, setCurrentHostname] = useState('');

  useEffect(() => {
    setCurrentHostname(window.location.origin);
  }, []);

  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              The Unique Girls Guide is dedicated to empowering young girls through culinary arts and home management skills.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href={`${currentHostname}/#about`} className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href={`${currentHostname}/#project`} className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link href={`${currentHostname}/#participants`} className="text-gray-300 hover:text-white transition-colors">Vote</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300">Email: info@uniquegirlsguide.org</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-800 text-center">
          <p className="text-gray-300">&copy; {new Date().getFullYear()} The Unique Girls Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
