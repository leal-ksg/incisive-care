import { useEffect, useMemo, useState } from 'react';
import { FaEye, FaPlusCircle } from 'react-icons/fa';
import { AppointmentsCount } from '../../domains/types';
import { getAppointmentsCount } from '../../services/appointments/get-appointments-count';
import { useNavigate } from 'react-router-dom';

export const AppointmentsInfo = () => {
  const [appointmentsCount, setAppointmentsCount] = useState<
    AppointmentsCount[]
  >([]);

  const navigate = useNavigate();

  const scheduled = useMemo(
    () => appointmentsCount.filter(ap => ap._id === 'SCHEDULED'),
    [appointmentsCount]
  );

  const completed = useMemo(
    () => appointmentsCount.filter(ap => ap._id === 'COMPLETED'),
    [appointmentsCount]
  );

  const cancelled = useMemo(
    () => appointmentsCount.filter(ap => ap._id === 'CANCELLED'),
    [appointmentsCount]
  );

  useEffect(() => {
    const fetchCounts = async () => {
      const counts = await getAppointmentsCount();

      setAppointmentsCount(counts);
    };

    fetchCounts();
  }, []);

  return (
    <div className="absolute top-62 flex h-40 w-[80%] items-center gap-11 rounded-xl bg-white px-12 py-5 shadow-[0px_0px_14px_1px_rgba(0,0,0,0.08)]">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#00AEC7]">Agendamentos</h3>
      </div>

      <div className="flex h-full w-full gap-2">
        <div className="flex h-full w-full rounded-lg border-2 border-gray-300 bg-[#F4F4F4]">
          <div className="flex h-full w-1/3 flex-col items-center justify-evenly border-r-2 border-gray-300">
            <h4 className="text-lg font-semibold text-[#00AEC7]">Em aberto</h4>
            <span className="text-4xl font-semibold text-amber-300">
              {scheduled && scheduled.length ? scheduled[0].total : 0}
            </span>
          </div>
          <div className="flex h-full w-1/3 flex-col items-center justify-evenly border-r-2 border-gray-300">
            <h4 className="text-lg font-semibold text-[#00AEC7]">Concluídos</h4>
            <span className="text-4xl font-semibold text-green-300">
              {completed && completed.length ? completed[0].total : 0}
            </span>
          </div>
          <div className="flex h-full w-1/3 flex-col items-center justify-evenly">
            <h4 className="text-lg font-semibold text-[#00AEC7]">Cancelados</h4>
            <span className="text-4xl font-semibold text-red-400">
              {cancelled && cancelled.length ? cancelled[0].total : 0}
            </span>
          </div>
        </div>

        <div className="flex h-full w-18 flex-col items-center justify-around rounded-lg border-2 border-gray-300 bg-[#F4F4F4] text-[#00AEC7]">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => navigate('/appointments')}
          >
            <FaEye size={30} />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => navigate('/appointments/new')}
          >
            <FaPlusCircle size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};
