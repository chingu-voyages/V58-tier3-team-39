type StatCardProps = {
  title: string;
  icon: React.ReactNode;
  item?: string;
  value?: number;
};

const StatCard = ({ title, icon, item, value }: StatCardProps) => {
  return (
    <div className="flex py-5 px-4 md:py-6 md:px-10 flex-col rounded-2xl border border-demo-border shadow-lg">
      <div className="flex justify-between mb-5">
        <h1 className="text-lg md:text-xl font-semibold text-secondary-text ">{title}</h1>
        <div className="">{icon}</div>
      </div>

      <div className="grow flex items-center justify-between">
        <div className="text-lg md:text-2xl font-semibold">{item}</div>
        {value !== undefined && (
          <div className="text-lg md:text-xl font-semibold">
            {value}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
