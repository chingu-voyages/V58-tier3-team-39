'use client';

import { useEffect, useState } from 'react';
import PieChartComponent from './PieChart';
import DonutChartComponent from './DonutChart';
import { getDemographicsStats } from '../app/services/statsService';

const Demographics = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDemographicsStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load demographics');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <div className="p-10 text-2xl">Loading demographics...</div>;
  if (error) return <div className="p-10 text-2xl text-red-500">{error}</div>;
  if (!stats) return <div className="p-10 text-2xl text-gray-500">No data available</div>;

  return (
    <main className="space-y-12 p-10">
      <PieChartComponent title="Voyage Role" data={stats.roleChart} />
      <DonutChartComponent
        title="Gender Distribution"
        data={stats.genderChart}
      />

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="text-2xl">
          Most Common Location: {stats.commonLocation?.name || 'N/A'}
        </div>
        <div className="text-2xl">
          Most Common Role: {stats.commonRole?.name || 'N/A'}
        </div>
      </div>
    </main>
  );
};

export default Demographics;
