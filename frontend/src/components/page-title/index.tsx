import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      className="flex text-[#00AEC7] ml-2 cursor-pointer items-center self-start"
    >
      <ChevronLeft className="mt-1 " strokeWidth={3} />
      <h1 className="text-2xl font-bold px-2 py-4">{title}</h1>
    </div>
  );
};
