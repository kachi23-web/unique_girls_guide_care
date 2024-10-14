import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Chef } from '@/libs/types';

interface ChefCardProps {
  chef: Chef;
}

const ChefCard: React.FC<ChefCardProps> = ({ chef }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <Image
        src={chef.image_url as string}
        alt={chef.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{chef.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{chef.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Votes: {chef.votes}
          </span>
          <Link
            href={`/vote/${chef.id}`}
            className="bg-primary-color text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Vote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChefCard;
