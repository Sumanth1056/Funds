
import { Fund, NewFund } from '../types';

let funds: Fund[] = [
  {
    _id: '1',
    name: 'Tech Growth Fund',
    structure: 'Equity',
    riskLevel: 'High',
    factors: ['Technology Sector', 'High Growth Stocks', 'US Market'],
    performance: [
      { date: '2023-01-01', nav: 100 },
      { date: '2023-02-01', nav: 105 },
      { date: '2023-03-01', nav: 112 },
      { date: '2023-04-01', nav: 108 },
      { date: '2023-05-01', nav: 115 },
      { date: '2023-06-01', nav: 122 },
      { date: '2023-07-01', nav: 125 },
    ],
  },
  {
    _id: '2',
    name: 'Stable Income Bond',
    structure: 'Debt',
    riskLevel: 'Low',
    factors: ['Government Bonds', 'Corporate Debt', 'Fixed Income'],
    performance: [
      { date: '2023-01-01', nav: 50 },
      { date: '2023-02-01', nav: 50.5 },
      { date: '2023-03-01', nav: 51 },
      { date: '2023-04-01', nav: 51.2 },
      { date: '2023-05-01', nav: 51.5 },
      { date: '2023-06-01', nav: 51.8 },
      { date: '2023-07-01', nav: 52 },
    ],
  },
  {
    _id: '3',
    name: 'Global Diversified Index',
    structure: 'Hybrid',
    riskLevel: 'Medium',
    factors: ['Global Equities', 'Emerging Markets', 'Diversification'],
    performance: [
      { date: '2023-01-01', nav: 200 },
      { date: '2023-02-01', nav: 202 },
      { date: '2023-03-01', nav: 210 },
      { date: '2023-04-01', nav: 205 },
      { date: '2023-05-01', nav: 215 },
      { date: '2023-06-01', nav: 218 },
      { date: '2023-07-01', nav: 225 },
    ],
  },
];

export const getFunds = async (): Promise<Fund[]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));
  return funds;
};

export const addFund = async (newFundData: NewFund): Promise<Fund> => {
  await new Promise(res => setTimeout(res, 500));
  const newFund: Fund = {
    ...newFundData,
    _id: new Date().getTime().toString(),
    performance: [
        { date: new Date().toISOString().split('T')[0], nav: Math.floor(Math.random() * 100) + 50 }
    ],
  };
  funds = [...funds, newFund];
  return newFund;
};
