import { PageTitle } from "@/components/page-title";
import Toolbar from "@/components/toolbar";
import { Service } from "@/domains/types";
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
import { getServices } from "@/services/services/get-services";
import { deleteService } from "@/services/services/delete-service";

export const Services = () => {
  const [shouldReload, setShoudReload] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getServices();

      setServices(response);
    };

    fetchServices();
  }, [shouldReload]);

  const handleServiceDelete = async (id: string) => {
    const deleted = await deleteService(id);

    if (deleted) setShoudReload((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar />
      <PageTitle title="Serviços" backPath="/" />
      <div className="flex p-6 justify-center w-full h-full">
        <div className="flex flex-col relative  rounded-lg w-[70%] mt-20">
          <div className="flex gap-2 justify-center items-center mb-2">
            <input
              className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
              type="text"
            />
            <button
              onClick={() => navigate("/services/new")}
              className="flex rounded-md font-bold p-2 cursor-pointer text-white bg-[#00AEC7] hover:bg-[#63daec] transition-colors ease duration-[0.2s]"
            >
              <FaPlusCircle size={20} />
            </button>
          </div>
          <Table className="justify-self-center rounded-t-4">
            <TableHeader className="bg-[#00AEC7]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[33.5%] text-white ml-0.5 rounded-tl-2xl font-semibold text-base">
                  Descrição
                </TableHead>
                <TableHead className="w-[14%] text-white ml-0.5 font-semibold text-base">
                  Categoria
                </TableHead>
                <TableHead className="w-[20%] text-white ml-0.5 font-semibold text-base">
                  Duração (min)
                </TableHead>
                <TableHead className="w-[15%] text-white ml-0.5 font-semibold text-base">
                  Valor unitário
                </TableHead>
                <TableHead className="w-[10%] text-white rounded-tr-2xl font-semibold text-base" />
              </TableRow>
            </TableHeader>
          </Table>

          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <Table className="justify-self-center rounded-t-4">
              <TableBody>
                {services?.map((service, index) => (
                  <TableRow
                    className={`flex font-semibold text-base text-gray-600 ${
                      index % 2 === 0 ? "bg-[#EFFCFF]" : "bg-[#C7D8DA]"
                    }`}
                    key={service.id}
                  >
                    <TableCell className="w-[36.2%]">
                      {service?.description}
                    </TableCell>
                    <TableCell className="w-[15.2%]">
                      {service?.category}
                    </TableCell>

                    <TableCell className="w-[21.5%]">
                      {service.duration}
                    </TableCell>

                    <TableCell className="w-[17%]">
                      {service?.unitAmount}
                    </TableCell>

                    <TableCell className="w-[10%] flex items-center justify-start">
                      <button
                        className="flex ml-2 items-center justify-center cursor-pointer p-[4px] w-[30px] h-[30px] transition-colors ease duration-[0.3s]  bg-cyan-300 hover:bg-cyan-200 rounded-[6px]"
                        type="button"
                        onClick={() => {
                          localStorage.setItem(
                            "selectedService",
                            JSON.stringify(service)
                          );
                          navigate("/services/edit");
                        }}
                      >
                        <FaPen color="white" />
                      </button>
                      <button
                        className="flex ml-2 items-center justify-center cursor-pointer p-[4px] w-[30px] h-[30px] transition-colors ease duration-[0.3s]  bg-red-400 hover:bg-red-300 rounded-[6px]"
                        type="button"
                        onClick={() => handleServiceDelete(service.id)}
                      >
                        <FaTrash color="white" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {services.length === 0 && (
            <div className="text-gray-800 m-0 p-2 bg-gray-100 font-semibold text-lg text-center">
              Nenhum serviço cadastrado ainda...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
