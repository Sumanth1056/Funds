
import React, { useState } from 'react';
import { Fund } from '../types';
import { analyzeFundWithGemini } from '../services/geminiService';
import PerformanceChart from './PerformanceChart';
import { XMarkIcon } from './icons/XMarkIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface FundDetailModalProps {
  fund: Fund;
  onClose: () => void;
}

const FundDetailModal: React.FC<FundDetailModalProps> = ({ fund, onClose }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError('');
    setAnalysis('');
    try {
      const result = await analyzeFundWithGemini(fund);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 transition-opacity">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{fund.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <XMarkIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Performance (NAV)</h3>
              <div className="h-64 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg">
                 {fund.performance && fund.performance.length > 0 ? (
                    <PerformanceChart data={fund.performance} />
                 ) : (
                    <div className="flex items-center justify-center h-full text-slate-500">No performance data available.</div>
                 )}
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-slate-600 dark:text-slate-300">Details</h4>
                <ul className="mt-2 space-y-2 text-slate-500 dark:text-slate-400">
                    <li><strong>Structure:</strong> {fund.structure}</li>
                    <li><strong>Risk Level:</strong> {fund.riskLevel}</li>
                    <li className="flex flex-wrap gap-2 items-start"><strong>Factors:</strong> 
                        <span className="flex flex-wrap gap-2">
                            {fund.factors.map(factor => (
                                <span key={factor} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-2 py-0.5 rounded-full">{factor}</span>
                            ))}
                        </span>
                    </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">AI Analysis</h3>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <SparklesIcon />
                {isAnalyzing ? 'Analyzing...' : 'Analyze with Gemini'}
              </button>

              <div className="mt-4 p-4 min-h-[200px] bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                {isAnalyzing && (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {analysis && (
                  <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
                )}
                {!isAnalyzing && !analysis && !error && (
                    <p className="text-slate-500 text-center pt-12">Click the button to generate an AI analysis of this fund.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetailModal;
