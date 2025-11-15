
export interface PerformanceData {
  date: string;
  nav: number;
}

export interface Fund {
  _id: string;
  name: string;
  structure: string;
  riskLevel: string;
  factors: string[];
  performance: PerformanceData[];
}

export type NewFund = Omit<Fund, '_id' | 'performance'>;
