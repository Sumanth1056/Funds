
import React, { useState } from 'react';
import { NewFund } from '../types';
import { XMarkIcon } from './icons/XMarkIcon';

interface AddFundModalProps {
  onAddFund: (newFundData: NewFund) => void;
  onClose: () => void;
}

const AddFundModal: React.FC<AddFundModalProps> = ({ onAddFund, onClose }) => {
  const [formState, setFormState] = useState({
    name: '',
    structure: '',
    riskLevel: 'Medium',
    factors: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const factorsArray = formState.factors.split(',').map(f => f.trim()).filter(f => f);
    const newFund: NewFund = {
      ...formState,
      factors: factorsArray,
    };
    onAddFund(newFund);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Mutual Fund</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <XMarkIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Fund Name</label>
              <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="structure" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Structure</label>
              <input type="text" name="structure" id="structure" value={formState.structure} onChange={handleChange} required placeholder="e.g., Equity, Debt, Hybrid" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="riskLevel" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Risk Level</label>
              <select name="riskLevel" id="riskLevel" value={formState.riskLevel} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label htmlFor="factors" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Factors (comma-separated)</label>
              <input type="text" name="factors" id="factors" value={formState.factors} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-500 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Add Fund</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFundModal;
