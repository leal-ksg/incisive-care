import { PageTitle } from "@/components/page-title";
import Toolbar from "@/components/toolbar";
import { Appointment } from "@/domains/types";
import { getAppointments } from "@/services/appointments/get-appointments";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPlusCircle, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteAppointment } from "@/services/appointments/delete-appointment";

export const Appointments = () => {
  const [shouldReload, setShoudReload] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

    if (deleted) setShoudReload((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar />
      <PageTitle title="Agendamentos" backPath="/" />
      <div className="flex p-6 justify-center w-full h-full">
        <div className="flex flex-col relative  rounded-lg w-[70%] mt-20">
          <div className="flex gap-2 justify-center items-center mb-2">
            <input
              className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
              type="text"
            />
            <button
              onClick={() => navigate("/appointments/new")}
              className="flex rounded-md font-bold p-2 cursor-pointer text-white bg-[#00AEC7] hover:bg-[#63daec] transition-colors ease duration-[0.2s]"
            >
              <FaPlusCircle size={20} />
            </button>
          </div>
          <Table className="justify-self-center rounded-t-4">
            <TableHeader className="bg-[#00AEC7]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[20%] text-white ml-0.5 rounded-tl-2xl font-semibold text-base">
                  Nome cliente
                </TableHead>
                <TableHead className="w-[20%] text-white ml-0.5 font-semibold text-base">
                  Nome dentista
                </TableHead>
                <TableHead className="w-[15%] text-white ml-0.5 font-semibold text-base">
                  Data e hora
                </TableHead>
                <TableHead className="w-[15%] text-white ml-0.5 font-semibold text-base">
                  Valor total
                </TableHead>
                <TableHead className="w-[15%] text-white ml-0.5 font-semibold text-base">
                  Status
                </TableHead>
                <TableHead className="w-[10%] text-white rounded-tr-2xl font-semibold text-base" />
              </TableRow>
            </TableHeader>
          </Table>

          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <Table className="justify-self-center rounded-t-4">
              <TableBody>
                {appointments.map((appointment, index) => (
                  <TableRow
                    className={`flex font-semibold text-base text-gray-600 ${
                      index % 2 === 0 ? "bg-[#EFFCFF]" : "bg-[#C7D8DA]"
                    }`}
                    key={index}
                  >
                    <TableCell className="w-[25%]">
                      {appointment?.patient?.name}
                    </TableCell>
                    <TableCell className="w-[25%]">
                      {appointment?.dentist?.name}
                    </TableCell>

                    <TableCell className="w-[18.7%]"></TableCell>

                    <TableCell className="w-[20%]">
                      {appointment?.services?.reduce((acc, service) => {
                        return acc + service.unitAmount;
                      }, 0)}
                    </TableCell>

                    <TableCell className="w-[20%]">
                      {appointment?.status}
                    </TableCell>

                    <TableCell className="w-[10%] flex items-center justify-start">
                      <button
                        className="flex ml-2 items-center justify-center cursor-pointer p-[4px] w-[30px] h-[30px] transition-colors ease duration-[0.3s]  bg-cyan-300 hover:bg-cyan-200 rounded-[6px]"
                        type="button"
                        onClick={() => {
                          localStorage.setItem(
                            "selectedAppointment",
                            JSON.stringify(appointment)
                          );
                          navigate("/appointments/edit");
                        }}
                      >
                        <FaPen color="white" />
                      </button>
                      <button
                        className="flex ml-2 items-center justify-center cursor-pointer p-[4px] w-[30px] h-[30px] transition-colors ease duration-[0.3s]  bg-red-400 hover:bg-red-300 rounded-[6px]"
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
            <div className="text-gray-800 m-0 p-2 bg-gray-100 font-semibold text-lg text-center">
              Não existem agendamentos ainda...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
