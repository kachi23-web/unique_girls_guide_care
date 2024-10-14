'use client';
import React, { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Spin, Input, Dropdown, Menu } from 'antd';
import { Chef } from '@/libs/types';
import { getChefs } from '@/libs/api';
import { ArrowRight, ChefHat, Heart, Search, SortAsc, SortDesc, ChevronDown, Filter, Info } from 'lucide-react';

export default function Home() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState('');
  const [displayCount, setDisplayCount] = useState(6);
  const [sortOrder, setSortOrder] = useState('desc');
  const [participantsFilter, setParticipantsFilter] = useState('');

  const fetchChefs = useCallback(async () => {
    try {
      const chefsData = await getChefs();
      setChefs(chefsData);
    } catch (error) {
      console.error('Error fetching chefs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChefs();
  }, [fetchChefs]);

  const totalVotes = chefs.reduce((sum, chef) => sum + (chef.votes || 0), 0);

  const filteredAndSortedChefs = chefs
    .filter(chef => chef.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .sort((a, b) => {
      const comparison = (b.votes || 0) - (a.votes || 0);
      return sortOrder === 'asc' ? -comparison : comparison;
    })
    .slice(0, displayCount);

    const displayOptions = [
      { label: 'Top 3', value: 3 },
      { label: 'Top 6', value: 6 },
      { label: 'Top 12', value: 12 },
      { label: 'All', value: 100 },
    ];
  
    const sortOptions = [
      { label: 'Highest Votes', value: 'desc', icon: <SortDesc size={16} /> },
      { label: 'Lowest Votes', value: 'asc', icon: <SortAsc size={16} /> },
    ];
  
    const displayMenu = (
      <Menu>
        {displayOptions.map((option) => (
          <Menu.Item key={option.value} onClick={() => setDisplayCount(option.value)}>
            {option.label}
          </Menu.Item>
        ))}
      </Menu>
    );
  
    const sortMenu = (
      <Menu>
        {sortOptions.map((option) => (
          <Menu.Item key={option.value} onClick={() => setSortOrder(option.value)}>
            <span className="flex items-center">
              {option.icon}
              <span className="ml-2">{option.label}</span>
            </span>
          </Menu.Item>
        ))}
      </Menu>
    );

    const filteredParticipants = chefs.filter(chef => 
      chef.name.toLowerCase().includes(participantsFilter.toLowerCase())
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-6xl font-bold text-purple-900 mb-6 leading-tight tracking-tight">
                UNIQUE GIRLS GUIDE
              </h1>
              <p className="text-2xl text-purple-700 mb-8 leading-relaxed">
                Empowering girls through culinary arts and home management
              </p>
              <Link
                href="#about"
                className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-3 rounded-[8px] text-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Learn More</span>
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="relative w-full h-0 pb-[100%] rounded-3xl overflow-hidden">
                <Image
                  src="/IMG-05.jpg"
                  alt="Girl Chef"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-purple-900 mb-12 text-center">About Us</h2>
          <p className="text-xl text-gray-700 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
            The Unique Girls Guide is dedicated to empowering young girls through culinary arts and home management skills, fostering confidence and independence for a brighter future.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="relative w-full h-0 pb-[100%] md:pb-[75%] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/IMG-04.jpg"
                  alt="Girl Chef"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-300 hover:scale-105"
                /></div>

          <div className="relative w-full h-0 pb-[100%] md:pb-[75%] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/IMG-05.jpg"
                  alt="Girl Chef"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="relative w-full h-0 pb-[100%] md:pb-[75%] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/IMG-06.jpg"
                  alt="Girl Chef"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-300 hover:scale-105"
                /></div>
              </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="py-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-purple-900 mb-12 text-center">Our Project</h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0">
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-0 pb-[100%] md:pb-[75%] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/unique-girl-chef.jpg"
                  alt="Girl Chef"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-purple-700 mb-6">The Girl Chef 2.0</h3>
              <p className="text-2xl text-purple-900 mb-6 font-medium">Who&apos;s the Next Unique Girl Chef?</p>
              <p className="mb-6 text-gray-700 leading-relaxed text-justify">
                The Unique Girls Guide, in collaboration with SUG KADPOLY, presents the U-Nice Cooking Competition—a transformative culinary event designed to equip vulnerable young girls with essential cooking skills and home management knowledge. Led by professional chefs, this initiative empowers participants to develop lifelong skills, fostering confidence and independence.
              </p>
              <p className="font-semibold text-purple-900 mb-6 text-xl">Voting: October 10th - October 23rd 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Participants Section */}
      <section id="participants" className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-purple-900 mb-12 text-center">Meet Our Participants</h2>
          
          {/* Sticky Search Bar */}
          <div className="sticky top-0 z-10 shadow-md bg-white rounded-b-2xl shadow-lg p-6 mb-8">
            <Input
              placeholder="Search participants"
              prefix={<Search className="text-gray-400" size={18} />}
              onChange={(e) => setParticipantsFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              style={{ fontSize: '16px' }}
            />
          </div>

          {loading ? (
            <div className="text-center">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Loading participants...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
              {filteredParticipants.sort((a, b) => (a.id || 0) - (b.id || 0)).map((chef) => (
                <div key={chef.id} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4 overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={chef.image_url || '/placeholder-chef.jpg'}
                        alt={chef.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-purple-900 mb-2">{chef.name}</h3>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <ChefHat size={16} className="mr-2" />
                      Code: {chef.id ? chef.id.toString().padStart(3, '0') : 'N/A'}
                    </p>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <Heart size={16} className="mr-2" />
                      Votes: {chef.votes || 0}
                    </p>
                    <Link href={`/vote/${chef.id}`} className="block w-full bg-purple-600 text-white text-center py-3 rounded-full hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                      Vote Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Current Results Section */}
      <section className="py-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-8 text-center tracking-tight">Results Leaderboard</h2>
          
          {/* Total Votes Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 text-center transition-all duration-300 hover:shadow-xl">
            <p className="text-2xl font-medium text-gray-600 mb-2">Total Votes Cast</p>
            <p className="text-6xl font-bold text-gray-900 tracking-tight">{totalVotes.toLocaleString()}</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-1/2">
                <Input
                  placeholder="Search by name"
                  prefix={<Search className="text-gray-400" size={18} />}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  style={{ fontSize: '16px' }}
                />
              </div>
              <div className="flex w-full md:w-1/2 space-x-4">
                <Dropdown overlay={displayMenu} trigger={['click']}>
                  <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span className="flex items-center justify-between">
                      <Filter size={18} className="mr-2" />
                      <span>Show: {displayOptions.find(o => o.value === displayCount)?.label}</span>
                      <ChevronDown size={18} className="ml-2" />
                    </span>
                  </button>
                </Dropdown>
                <Dropdown overlay={sortMenu} trigger={['click']}>
                  <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <span className="flex items-center justify-between">
                      <span>Sort: {sortOptions.find(o => o.value === sortOrder)?.label}</span>
                      <ChevronDown size={18} className="ml-2" />
                    </span>
                  </button>
                </Dropdown>
              </div>
            </div>
          </div>

          {/* Chefs List */}
          {loading ? (
            <div className="text-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-xl text-gray-600">Loading results...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAndSortedChefs.map((chef, index) => (
                <div key={chef.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-6">
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden shadow-inner">
                    <Image
                      src={chef.image_url || '/placeholder-chef.jpg'}
                      alt={chef.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{chef.name}</h3>
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    </div>
                    <p className="text-gray-600 mb-3 flex items-center text-lg">
                      <span className="font-semibold mr-2">{chef.votes || 0}</span>
                      votes
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                        style={{
                          width: `${totalVotes > 0 ? ((chef.votes || 0) / totalVotes) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 shadow-inner">
            <div className="flex items-start space-x-4">
              <Info className="text-blue-500 flex-shrink-0 mt-1" size={24} />
              <p className="text-gray-700 text-lg leading-relaxed">
                This leaderboard displays the top chefs based on your current filter settings. Adjust the filters above to see different results. The full list of participants can be found in the &quot;Meet Our Participants&quot; section above. Keep voting to see if your favorite chef makes it to the top!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
