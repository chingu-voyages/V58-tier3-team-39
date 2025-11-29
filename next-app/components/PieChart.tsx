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
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx! ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={10}
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

interface PieChartComponentProps {
  isAnimationActive?: boolean;
}

const PieChartComponent = ({
  data,
  title,
  isAnimationActive = true,
}: PieChartComponentProps) => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      {title && <h3 className="font-semibold text-lg">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </RePieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
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
