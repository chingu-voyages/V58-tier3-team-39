'use client';

import Image from 'next/image';
import Link from 'next/link';

const MemberDemographics = () => {
  const cards = [
    {
      title: 'Interactive World Map',
      description: 'Visualize Chingu members across the globe with an interactive map showing member counts by country',
      image: '/images/image1.jpg',
      href: '/map',
    },
    {
      title: 'Advanced Filtering',
      description: 'Filter members by gender, country, year joined, role type, tier, and voyage participation',
      image: '/images/image2.jpg',
      href: '/dashboard',
    },
    {
      title: 'Detailed Analytics',
      description: 'View comprehensive member data including roles, tiers, and voyage history in a sortable list',
      image: '/images/image3.jpg',
      href: '/list',
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 mt-10">
      <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-normal mb-8 sm:mb-9 lg:mb-11 uppercase tracking-wide sm:tracking-widest">
        EXPLORE MEMBER DEMOGRAPHICS
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className={`bg-secondary-bg rounded-xl shadow-lg p-4 sm:p-6 hover:bg-secondary-bg/50 hover:transition hover:shadow-2xl transition-shadow cursor-pointer
                      ${index % 2 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'} flex flex-col lg:flex-col gap-8`}
          >
            <div className="relative w-full h-[180px] sm:w-65 sm:h-58 md:w-78 md:h-58 lg:w-full lg:h-[280px] mb-4 sm:mb-0 lg:mb-4 rounded-lg shrink-0">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl sm:text-[1.4rem] lg:text-2xl text-left mb-12 sm:mb-7 lg:mb-15">
                {card.title}
              </h3>
              <p className="text-secondary-text text-left text-base md:text-base mb-10 sm:mb-8 lg:mb-11 leading-relaxed">
              {card.description}
              </p>
             
              <div className="flex items-start">
                <Image
                  src="/images/arrowIcon.png"
                  alt="Arrow up right"
                  width={22}
                  height={22}
                  className="w-5 h-5"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MemberDemographics;
