'use client';

import { animated, useSpring } from '@react-spring/web';

export default function AnimatedNumber({
  n,
  className = '',
}: {
  n: number;
  className?: string;
}) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 5 },
  });

  return (
    <animated.span className={className}>
      {number.to((val) => val.toFixed(0))}
    </animated.span>
  );
}
