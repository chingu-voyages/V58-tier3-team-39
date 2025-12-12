'use client';

import Image from 'next/image';

const MemberDemographics = () => {
  const cards = [
    {
      title: 'Interactive World Map View',
      description: 'Visualize Chingu members across the globe with an interactive map showing member counts by country',
      image: '/images/image1.png',
    },
    {
      title: 'Advanced Filtering',
      description: 'Filter members by gender, country, year joined, role type, tier, and voyage participation',
      image: '/images/image2.png',
    },
    {
      title: 'Detailed Analytics',
      description: 'View comprehensive member data including roles, tiers, and voyage history in a sortable list',
      image: '/images/image3.png',
    },
  ];

  return (
    <section className="w-full bg-[#F6F6F6] py-16 px-4 md:px-8 mt-10">
      <h2 className="text-center text-2xl md:text-3xl font-normal text-[#232925] mb-12 uppercase tracking-wide">
        EXPLORE MEMBER DEMOGRAPHICS
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#1A2535] rounded-xl shadow-lg flex flex-col p-4 md:p-5"
          >
            <div className="relative w-full h-48 md:h-56 mb-4 md:mb-6 rounded-lg overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl md:text-2xl text-left font-normal text-white mb-12">
                {card.title}
              </h3>
              <p className="text-[#8D91A6] text-left text-base font-light md:text-base mb-10 flex-1">
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemberDemographics;
