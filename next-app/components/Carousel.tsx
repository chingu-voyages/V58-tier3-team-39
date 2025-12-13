'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const carouselSlides = [
    {
      title: 'Global Community',
      text: "Our community spans the globe, bringing together people from diverse backgrounds to build real experience through hands-on projects. No matter where they're from, members collaborate, share unique perspectives, and support one another as they learn and grow.",
    },
    {
      title: 'Real Collaboration',
      text: "Through Chingu, aspiring developers transform from solo learners into collaborative team players. Working on real projects with global teammates teaches essential skills that can't be learned from tutorials alone.",
    },
    {
      title: 'Journey of Discovery',
      text: 'Every voyage is a journey of discovery. Members push beyond their comfort zones, tackle challenging problems, and emerge with confidence, new skills, and lasting connections with fellow developers worldwide.',
    },
    {
      title: 'Professional Experience',
      text: 'From concept to deployment, teams work together to build applications that solve real problems. The experience mirrors professional development environments, preparing members for their dream careers in tech.',
    },
    {
      title: 'Launch Your Career',
      text: "Join thousands of developers who have launched their careers through Chingu. Whether you're just starting or looking to level up, our supportive community will help you achieve your goals and build amazing things together.",
    },
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs sm:max-w-sm md:max-w-2xl h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselSlides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
                {slide.title}
              </h3>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-md md:max-w-lg text-gray-600">
                {slide.text}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
