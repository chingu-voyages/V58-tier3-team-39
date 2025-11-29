'use client';

import {
  Cell,
  Pie,
  PieChart as RePieChart,
  Legend,
  PieLabelRenderProps,
  ResponsiveContainer,
} from 'recharts';

export interface DonutChartData {
  name: string;
  value: number;
  title?: string;
  [key: string]: any;
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
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps & { name?: string }) => {
  if (!cx || !cy || !innerRadius || !outerRadius) return null;

  // Hide labels for values under 5%
  if ((percent ?? 0) < 0.05) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize={12}
      textAnchor="middle"
      dominantBaseline="middle"
      fontWeight="600"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DonutChartComponent({ title, data }: DonutChartProps) {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      {title && <h2 className="font-semibold text-lg">{title}</h2>}

      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            label={renderLabel}
            labelLine={false}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}
