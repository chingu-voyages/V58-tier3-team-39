import Chingu from './icons/Chingu';

const Hero = () => {
  return (
    <div className="h-screen bg-[#F1F5F9] flex flex-col justify-center items-center px-4 md:px-8 text-center gap-6 md:gap-7 lg:gap-10 mt-10 lg:mt-0">
      <Chingu />
      <h1 className="text-3xl lg:text-5xl font-semibold text-[#232925]">
        Discover the Global <span className="text-[#4D77FF]">Chingu </span>
        Community
      </h1>
      <h3 className="font-medium text-[#636363] md:max-w-2/4 md:text-xl">
        Learn more about where our members are located and the demographics of
        our members.
      </h3>
      <div className="flex gap-5">
        <button className="p-1 rounded bg-[#4D77FF] text-white">
          Map View
        </button>
        <button className="p-1 rounded border border-[#4D77FF] text-[#232925]">
          List View
        </button>
      </div>
      <div className="flex flex-col gap-4 md:gap-16 lg:gap-20 md:flex-row md:mt-3 lg:mt-5">
        <div>
          <p className="text-2xl md:text-3xl lg:text-5xl font-medium">250+</p>
          <p className="text-[#636363] mt-1 md:mt-2 text-sm">Total Members</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl lg:text-5xl font-medium">20+</p>
          <p className="text-[#636363] mt-1 md:mt-2 text-sm">Countries</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl lg:text-5xl font-medium">20+</p>
          <p className="text-[#636363] mt-1 md:mt-2 text-sm">Active Teams</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl lg:text-5xl font-medium">3</p>
          <p className="text-[#636363] mt-1 md:mt-2 text-sm">Tier Levels</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
