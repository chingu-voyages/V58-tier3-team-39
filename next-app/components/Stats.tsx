'use client';

import AnimatedNumber from './AnimatedNumber';
import useInView from '../hooks/useInView';
import { CircleUserRound, Globe, ShieldHalf, CircleStar } from 'lucide-react';

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

const iconClasses ="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 mr-2 text-blue-brand"
const icons = [
  <CircleUserRound className={iconClasses} />, 
  <Globe className={iconClasses} />, 
  <ShieldHalf className={iconClasses} />, 
  <CircleStar className={iconClasses} />
]

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:flex gap-10 md:-gap-4 md:gap-12 lg:gap-16 md:flex-row"
    >
      {stats.map((item, i) => {
        const numericValue = parseInt(item.value);
        const hasPlus = item.value.includes('+');

        return (
          <div key={i}>
            {isInView ? (
              <div className='flex justify-center items-center'>
                {icons[i]}
                <AnimatedNumber
                  n={numericValue}
                  className={`text-[1.625rem] lg:text-4xl font-medium `}
                />
                {hasPlus && (
                  <span
                    className={`text-[1.625rem] lg:text-4xl font-medium`}
                  >
                    +
                  </span>
                )}
              </div>
             
            ) : (
              <span
                className={`text-[1.625rem] lg:text-4xl font-medium text-secondary-text`}
              >
                0{hasPlus && '+'}
              </span>
            )}

            <p className={`${item.color} font-semibold mt-1 md:mt-2 text-lg md:text-lg lg:text-xl`}>
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
