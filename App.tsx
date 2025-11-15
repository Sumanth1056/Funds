
import React, { useState, useEffect, useCallback } from 'react';
import { Fund, NewFund } from './types';
import { getFunds, addFund } from './services/fundService';
import Header from './components/Header';
import FundCard from './components/FundCard';
import FundDetailModal from './components/FundDetailModal';
import AddFundModal from './components/AddFundModal';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFunds = useCallback(async () => {
    setIsLoading(true);
    try {
      const fundsData = await getFunds();
      setFunds(fundsData);
    } catch (error) {
      console.error("Error fetching funds:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFunds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectFund = (fund: Fund) => {
    setSelectedFund(fund);
  };

  const handleCloseDetailModal = () => {
    setSelectedFund(null);
  };

  const handleAddFund = async (newFundData: NewFund) => {
    try {
      const newFund = await addFund(newFundData);
      setFunds(prevFunds => [...prevFunds, newFund]);
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding fund:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Available Funds</h1>
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            <PlusIcon />
            Add New Fund
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : funds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {funds.map(fund => (
              <FundCard key={fund._id} fund={fund} onSelectFund={handleSelectFund} />
            ))}
          </div>
        ) : (
           <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">No Funds Found</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Get started by adding a new mutual fund.</p>
          </div>
        )}
      </main>

      {selectedFund && (
        <FundDetailModal fund={selectedFund} onClose={handleCloseDetailModal} />
      )}

      {isAddModalOpen && (
        <AddFundModal onAddFund={handleAddFund} onClose={() => setAddModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
