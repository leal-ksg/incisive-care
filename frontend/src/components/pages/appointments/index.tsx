import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { Appointment } from '@/domains/types';
import { getAppointments } from '@/services/appointments/get-appointments';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaPlusCircle, FaPen, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteAppointment } from '@/services/appointments/delete-appointment';

export const Appointments = () => {
  const [shouldReload, setShoudReload] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // const [appointmentServices, setAppointmentServices] = 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getAppointments();

      setAppointments(response);
    };

    fetchAppointments();
  }, [shouldReload]);

  const handleAppointmentDelete = async (id: string) => {
    const deleted = await deleteAppointment(id);

    if (deleted) setShoudReload(prev => !prev);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle title="Agendamentos" backPath="/" />
      <div className="flex h-full w-full justify-center p-6">
        <div className="relative mt-20 flex w-[70%] flex-col rounded-lg">
          <div className="mb-2 flex items-center justify-center gap-2">
            <input
              className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
              type="text"
            />
            <button
              onClick={() => navigate('/appointments/new')}
              className="ease flex cursor-pointer rounded-md bg-[#00AEC7] p-2 font-bold text-white transition-colors duration-[0.2s] hover:bg-[#63daec]"
            >
              <FaPlusCircle size={20} />
            </button>
          </div>
          <Table className="rounded-t-4 justify-self-center">
            <TableHeader className="bg-[#00AEC7]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="ml-0.5 w-[20%] rounded-tl-2xl text-base font-semibold text-white">
                  Nome cliente
                </TableHead>
                <TableHead className="ml-0.5 w-[20%] text-base font-semibold text-white">
                  Nome dentista
                </TableHead>
                <TableHead className="ml-0.5 w-[15%] text-base font-semibold text-white">
                  Data e hora
                </TableHead>
                <TableHead className="ml-0.5 w-[15%] text-base font-semibold text-white">
                  Valor total
                </TableHead>
                <TableHead className="ml-0.5 w-[15%] text-base font-semibold text-white">
                  Status
                </TableHead>
                <TableHead className="w-[10%] rounded-tr-2xl text-base font-semibold text-white" />
              </TableRow>
            </TableHeader>
          </Table>

          <div className="custom-scrollbar max-h-[500px] overflow-y-auto">
            <Table className="rounded-t-4 justify-self-center">
              <TableBody>
                {appointments.map((appointment, index) => (
                  <TableRow
                    className={`flex text-base font-semibold text-gray-600 ${
                      index % 2 === 0 ? 'bg-[#EFFCFF]' : 'bg-[#C7D8DA]'
                    }`}
                    key={index}
                  >
                    <TableCell className="w-[25%]">
                      {appointment?.patient?.name}
                    </TableCell>
                    <TableCell className="w-[25%]">
                      {appointment?.dentist?.name}
                    </TableCell>

                    <TableCell className="w-[18.7%]">
                      {new Date(appointment.date).toLocaleString('pt-br')}
                    </TableCell>

                    <TableCell className="w-[20%]">
                      {appointment?.services?.reduce((acc, service) => {
                        return acc + service.unitAmount;
                      }, 0)}
                    </TableCell>

                    <TableCell className="w-[20%]">
                      {appointment?.status}
                    </TableCell>

                    <TableCell className="flex w-[10%] items-center justify-start">
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-cyan-300 p-[4px] transition-colors duration-[0.3s] hover:bg-cyan-200"
                        type="button"
                        onClick={() => {
                          localStorage.setItem(
                            'selectedAppointment',
                            JSON.stringify(appointment)
                          );
                          navigate('/appointments/edit');
                        }}
                      >
                        <FaPen color="white" />
                      </button>
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-red-400 p-[4px] transition-colors duration-[0.3s] hover:bg-red-300"
                        type="button"
                        onClick={() => handleAppointmentDelete(appointment.id)}
                      >
                        <FaTrash color="white" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {appointments.length === 0 && (
            <div className="m-0 bg-gray-100 p-2 text-center text-lg font-semibold text-gray-800">
              Não existem agendamentos ainda...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
