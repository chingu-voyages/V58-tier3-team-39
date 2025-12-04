import PieChartComponent from './PieChart';
import data from '../app/data/chingu_info.json';
import { getDemographipcsStats } from '@/lib/dataHelpers';
import DonutChartComponent from './DonutChart';

const Demographics = () => {
  const stats = getDemographipcsStats(data);

  return (
    <main className="space-y-12 p-10">
      <PieChartComponent title="Voyage Role" data={stats.roleChart} />
      <DonutChartComponent
        title="Gender Distribution"
        data={stats.genderChart}
      />

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="text-2xl">Active Users: {stats.activeUsers}</div>

        <div className="text-2xl">
          Most Common Location: {stats.commonLocation}
        </div>

        <div className="text-2xl">Most Common Role: {stats.commonRole}</div>
      </div>
    </main>
  );
};

export default Demographics;
