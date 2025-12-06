'use client';

import AnimatedNumber from './AnimatedNumber';
import useInView from '../hooks/useInView';

interface StatItem {
  value: string;
  label: string;
  color: string;
}

interface StatsProps {
  stats: StatItem[];
}

const Stats = ({ stats }: StatsProps) => {
  const { ref, isInView } = useInView({
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 md:gap-16 lg:gap-24 md:flex-row md:mt-3 lg:mt-10"
    >
      {stats.map((item, i) => {
        const numericValue = parseInt(item.value);
        const hasPlus = item.value.includes('+');

        return (
          <div key={i}>
            {isInView ? (
              <>
                <AnimatedNumber
                  n={numericValue}
                  className={`text-3xl lg:text-5xl font-medium ${item.color}`}
                />
                {hasPlus && (
                  <span
                    className={`text-3xl lg:text-5xl font-medium ${item.color}`}
                  >
                    +
                  </span>
                )}
              </>
            ) : (
              <span
                className={`text-3xl lg:text-5xl font-medium ${item.color}`}
              >
                0{hasPlus && '+'}
              </span>
            )}

            <p className="text-[#636363] font-medium mt-1 md:mt-4 text-lg md:text-xl">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
