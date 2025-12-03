'use client';

import {
  Cell,
  Pie,
  PieChart as RePieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
} from 'recharts';

const RADIAN = Math.PI / 180;

export interface PieChartData {
  [key: string]: string | number;
  name: string;
  value: number;
}

interface PieChartComponentProps {
  data: PieChartData[];
  title?: string;
  isAnimationActive?: boolean;
}

const COLORS = [
  'var(--color-blue-brand)',
  'var(--color-green)',
  'var(--color-red)',
  'var(--color-purple)',
  'var(--color-blue)',
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (!cx || !cy || !outerRadius) return null;

  const offset = 18;
  const radius = outerRadius + offset;
  const angle = (midAngle ?? 0) * RADIAN;

  const x = cx + radius * Math.cos(-angle);
  const y = cy + radius * Math.sin(-angle);

  const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const fontSize = w < 640 ? 10 : w < 1024 ? 12 : 14;

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      fontSize={fontSize}
      fontWeight="600"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = ({
  data,
  title,
  isAnimationActive = true,
}: PieChartComponentProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl flex flex-col items-center">
      {title && (
        <h3 className="font-semibold text-xl md:text-2xl text-center">
          {title}
        </h3>
      )}

      {/* Chart Wrapper */}
      <div
        className="w-full 
          min-h-[260px] sm:h-[300px] md:h-[360px] 
          lg:h-[420px] xl:h-[480px] mt-4 pointer-events-none"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={renderCustomizedLabel}
              isAnimationActive={isAnimationActive}
            >
              {data.map((entry, i) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
