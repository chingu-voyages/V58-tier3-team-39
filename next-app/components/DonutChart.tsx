'use client';

import {
  Cell,
  Pie,
  PieChart as RePieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
} from 'recharts';

export interface DonutChartData {
  name: string;
  value: number;
  title?: string;
  [key: string]: string | number | undefined;
}

interface DonutChartProps {
  title?: string;
  data: DonutChartData[];
}

const RADIAN = Math.PI / 180;

const COLORS = [
  'var(--color-blue-brand)',
  'var(--color-green)',
  'var(--color-red)',
  'var(--color-purple)',
  'var(--color-blue)',
];
const renderLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (!cx || !cy || !outerRadius || percent == null) return null;

  const raw = percent * 100;

  let formatted: string;
  if (raw < 1) {
    formatted = raw.toFixed(1); // 0.8%
  } else if (raw < 10) {
    formatted = raw.toFixed(1); // 4.5%
  } else {
    formatted = Math.round(raw).toString(); // 24%
  }

  const angle = (midAngle ?? 0) * RADIAN;

  const labelOffset = 22;
  const radius = outerRadius + labelOffset;

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
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {formatted}%
    </text>
  );
};

export default function DonutChartComponent({ title, data }: DonutChartProps) {
  return (
    <div className="bg-white p-5 rounded-2xl flex flex-col items-center">
      {title && <h2 className="font-semibold text-xl md:text-2xl">{title}</h2>}
      <div
        className="w-full 
                      h-[260px] sm:h-[300px] md:h-[360px] 
                      lg:h-[420px] xl:h-[480px] mt-4 pointer-events-none"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="50%"
              outerRadius="70%"
              label={renderLabel}
              minAngle={5}
              labelLine={false}
              isAnimationActive={true}
            >
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, index) => {
          return (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />

              <span className="text-sm font-medium text-gray-700">
                {entry.name}
              </span>

              <span className="text-sm text-gray-500">{entry.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
