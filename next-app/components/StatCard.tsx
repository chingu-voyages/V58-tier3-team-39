type StatCardProps = {
  title: string;
  icon: React.ReactNode;
  item: string | number;
  number?: string | number;
};

const StatCard = ({ title, icon, item, number }: StatCardProps) => {
  return (
    <div className="bg-white flex h-36 py-3 px-4 flex-col rounded-2xl">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-500">{title}</h1>
        <div className="text-2xl text-gray-500">{icon}</div>
      </div>

      <div className="flex justify-between">
        <div className="text-3xl font-semibold">{item}</div>
        {number !== undefined && (
          <div className="text-3xl font-semibold text-blue-brand">{number}</div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
