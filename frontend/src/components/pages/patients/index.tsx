import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { Patient } from '@/domains/types';
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
import { getPatients } from '@/services/patients/get-patients';
import { deletePatient } from '@/services/patients/delete-patient';

export const Patients = () => {
  const [shouldReload, setShoudReload] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await getPatients();

      setPatients(response);
    };

    fetchPatients();
  }, [shouldReload]);

  const handlePatientDelete = async (id: string) => {
    const deleted = await deletePatient(id);

    if (deleted) setShoudReload(prev => !prev);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle title="Pacientes" backPath="/" />
      <div className="flex h-full w-full justify-center p-6">
        <div className="relative mt-20 flex w-[70%] flex-col rounded-lg">
          <div className="mb-2 flex items-center justify-center gap-2">
            <input
              className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
              type="text"
            />
            <button
              onClick={() => navigate('/patients/new')}
              className="ease flex cursor-pointer rounded-md bg-[#00AEC7] p-2 font-bold text-white transition-colors duration-[0.2s] hover:bg-[#63daec]"
            >
              <FaPlusCircle size={20} />
            </button>
          </div>
          <Table className="rounded-t-4 justify-self-center">
            <TableHeader className="bg-[#00AEC7]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="ml-0.5 w-[33.5%] rounded-tl-2xl text-base font-semibold text-white">
                  Nome
                </TableHead>
                <TableHead className="ml-0.5 w-[14%] text-base font-semibold text-white">
                  CPF
                </TableHead>
                <TableHead className="ml-0.5 w-[20%] text-base font-semibold text-white">
                  Data nascimento
                </TableHead>
                <TableHead className="ml-0.5 w-[15%] text-base font-semibold text-white">
                  Telefone
                </TableHead>
                <TableHead className="w-[10%] rounded-tr-2xl text-base font-semibold text-white" />
              </TableRow>
            </TableHeader>
          </Table>

          <div className="custom-scrollbar max-h-[400px] overflow-y-auto">
            <Table className="rounded-t-4 justify-self-center">
              <TableBody>
                {patients.map((patient, index) => (
                  <TableRow
                    className={`flex text-base font-semibold text-gray-600 ${
                      index % 2 === 0 ? 'bg-[#EFFCFF]' : 'bg-[#C7D8DA]'
                    }`}
                    key={patient.id}
                  >
                    <TableCell className="w-[36.2%]">{patient?.name}</TableCell>
                    <TableCell className="w-[15.2%]">{patient?.cpf}</TableCell>

                    <TableCell className="w-[21.5%]">
                      {new Intl.DateTimeFormat('pt-BR').format(
                        new Date(patient.dateOfBirth)
                      )}
                    </TableCell>

                    <TableCell className="w-[17%]">{patient?.phone}</TableCell>

                    <TableCell className="flex w-[10%] items-center justify-start">
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-cyan-300 p-[4px] transition-colors duration-[0.3s] hover:bg-cyan-200"
                        type="button"
                        onClick={() => {
                          localStorage.setItem(
                            'selectedPatient',
                            JSON.stringify(patient)
                          );
                          navigate('/patients/edit');
                        }}
                      >
                        <FaPen color="white" />
                      </button>
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-red-400 p-[4px] transition-colors duration-[0.3s] hover:bg-red-300"
                        type="button"
                        onClick={() => handlePatientDelete(patient.id)}
                      >
                        <FaTrash color="white" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {patients.length === 0 && (
            <div className="m-0 bg-gray-100 p-2 text-center text-lg font-semibold text-gray-800">
              Nenhum paciente cadastrado ainda...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
