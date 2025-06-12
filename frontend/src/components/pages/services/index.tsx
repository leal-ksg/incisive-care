import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { Service } from '@/domains/types';
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
import { getServices } from '@/services/services/get-services';
import { deleteService } from '@/services/services/delete-service';

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

  const handleServiceDelete = async (id: number) => {
    const deleted = await deleteService(id);

    if (deleted) setShoudReload(prev => !prev);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle title="Serviços" backPath="/" />
      <div className="flex h-full w-full justify-center p-6">
        <div className="relative mt-20 flex w-[70%] flex-col rounded-lg">
          <div className="mb-2 flex items-center justify-end gap-2">
            <button
              onClick={() => navigate('/services/new')}
              className="ease flex cursor-pointer justify-between gap-4 rounded-md bg-[#00AEC7] p-2 font-bold text-white transition-colors duration-[0.2s] hover:bg-[#63daec]"
            >
              Adicionar
              <FaPlusCircle size={20} />
            </button>
          </div>
          <Table className="rounded-t-4 justify-self-center">
            <TableHeader className="bg-[#00AEC7]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="ml-0.5 w-[33.5%] rounded-tl-2xl text-base font-semibold text-white">
                  Descrição
                </TableHead>
                <TableHead className="ml-0.5 w-[14%] text-base font-semibold text-white">
                  Categoria
                </TableHead>
                <TableHead className="ml-0.5 w-[20%] text-base font-semibold text-white">
                  Duração (min)
                </TableHead>
                <TableHead className="ml-0.5 w-[15%] text-base font-semibold text-white">
                  Valor unitário
                </TableHead>
                <TableHead className="w-[10%] rounded-tr-2xl text-base font-semibold text-white" />
              </TableRow>
            </TableHeader>
          </Table>

          <div className="custom-scrollbar max-h-[400px] overflow-y-auto">
            <Table className="rounded-t-4 justify-self-center">
              <TableBody>
                {services?.map((service, index) => (
                  <TableRow
                    className={`flex text-base font-semibold text-gray-600 ${
                      index % 2 === 0 ? 'bg-[#EFFCFF]' : 'bg-[#C7D8DA]'
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

                    <TableCell className="flex w-[10%] items-center justify-start">
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-cyan-300 p-[4px] transition-colors duration-[0.3s] hover:bg-cyan-200"
                        type="button"
                        onClick={() => {
                          localStorage.setItem(
                            'selectedService',
                            JSON.stringify(service)
                          );
                          navigate('/services/edit');
                        }}
                      >
                        <FaPen color="white" />
                      </button>
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-red-400 p-[4px] transition-colors duration-[0.3s] hover:bg-red-300"
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
            <div className="m-0 bg-gray-100 p-2 text-center text-lg font-semibold text-gray-800">
              Nenhum serviço cadastrado ainda...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
