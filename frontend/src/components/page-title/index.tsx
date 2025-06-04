import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PageTitle = ({
  title,
  backPath,
}: {
  title: string;
  backPath: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(backPath)}
      className="ml-2 flex cursor-pointer items-center self-start text-[#00AEC7]"
    >
      <ChevronLeft className="mt-1" strokeWidth={3} />
      <h1 className="px-2 py-4 text-2xl font-bold">{title}</h1>
    </div>
  );
};
