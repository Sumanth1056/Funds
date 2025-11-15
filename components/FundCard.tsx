
import React from 'react';
import { Fund } from '../types';

interface FundCardProps {
  fund: Fund;
  onSelectFund: (fund: Fund) => void;
}

const riskColorMap: { [key: string]: string } = {
  'Low': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'High': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const FundCard: React.FC<FundCardProps> = ({ fund, onSelectFund }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{fund.name}</h2>
             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${riskColorMap[fund.riskLevel] || 'bg-gray-100 text-gray-800'}`}>
                {fund.riskLevel} Risk
            </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-4">{fund.structure} Fund</p>
        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2 text-slate-600 dark:text-slate-300">Key Factors:</h4>
          <div className="flex flex-wrap gap-2">
            {fund.factors.slice(0, 3).map(factor => (
              <span key={factor} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">
                {factor}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
        <button
          onClick={() => onSelectFund(fund)}
          className="w-full text-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition"
        >
          View Details & Analyze
        </button>
      </div>
    </div>
  );
};

export default FundCard;
