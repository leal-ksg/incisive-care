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
    <div className="absolute flex gap-11 items-center top-62 bg-white rounded-xl shadow-[0px_0px_14px_1px_rgba(0,0,0,0.08)] w-[80%] h-40 px-12 py-5">
      <div className="text-center">
        <h3 className="text-[#00AEC7] font-bold text-2xl">Agendamentos</h3>
      </div>

      <div className=" flex gap-2 w-full h-full">
        <div className="flex border-2 border-gray-300 rounded-lg bg-[#F4F4F4] w-full h-full">
          <div className="flex flex-col items-center justify-evenly w-1/3 h-full border-r-2 border-gray-300">
            <h4 className="text-[#00AEC7] text-lg font-semibold">Em aberto</h4>
            <span className="font-semibold text-4xl text-amber-300">
              {scheduled && scheduled.length ? scheduled[0].total : 0}
            </span>
          </div>
          <div className="flex flex-col items-center justify-evenly w-1/3 h-full border-r-2 border-gray-300">
            <h4 className="text-[#00AEC7] text-lg font-semibold">Concluídos</h4>
            <span className="font-semibold text-4xl text-green-300">
              {completed && completed.length ? completed[0].total : 0}
            </span>
          </div>
          <div className="flex flex-col items-center justify-evenly w-1/3 h-full">
            <h4 className="text-[#00AEC7] text-lg font-semibold">Cancelados</h4>
            <span className="font-semibold text-4xl text-red-400">
              {cancelled && cancelled.length ? cancelled[0].total : 0}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-around border-2 border-gray-300 rounded-lg bg-[#F4F4F4] w-18 h-full text-[#00AEC7]">
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
