
import React from 'react';
import { ChartBarIcon } from './icons/ChartBarIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Mutual Fund AI Analyzer</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
