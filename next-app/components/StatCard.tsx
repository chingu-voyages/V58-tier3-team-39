type StatCardProps = {
  title: string;
  icon: React.ReactNode;
  item?: string;
  value?: number;
};

const StatCard = ({ title, icon, item, value }: StatCardProps) => {
  return (
    <div className="bg-white flex h-36 py-3 px-4 md:py-5 md:px-10 flex-col rounded-2xl">
      <div className="flex justify-between">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-500">
          {title}
        </h1>
        <div className="text-lg md:text-2xl text-gray-500">{icon}</div>
      </div>

      <div className="grow flex items-center justify-between">
        <div className="text-lg md:text-3xl font-semibold">{item}</div>
        {value !== undefined && (
          <div className="text-lg md:text-3xl font-semibold text-blue-brand">
            {value}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
