
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PerformanceData } from '../types';

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedData}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
        <XAxis dataKey="date" stroke="rgb(100 116 139)" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="rgb(100 116 139)" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderColor: 'rgb(71 85 105)',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: 'rgb(203 213 225)' }}
        />
        <Legend wrapperStyle={{fontSize: "14px"}}/>
        <Line type="monotone" dataKey="nav" name="NAV" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
