import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { formatInput } from '@/lib/format-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { appointmentSchema } from './schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaTrash } from 'react-icons/fa';
import { FaCircleCheck, FaCirclePlus, FaCircleXmark } from 'react-icons/fa6';
import { getPatientById } from '@/services/patients/get-patient-by-id';
import { getDentists } from '@/services/dentists/get-dentists';
import {
  AppointmentDTO,
  AppointmentsFormData,
  Dentist,
  Patient,
  Service,
} from '@/domains/types';
import { getServices } from '@/services/services/get-services';
import { toast } from 'sonner';
import { errorToast } from '@/lib/toast-styles';
import { createAppointment } from '@/services/appointments/create-appointment';
import { formatToDatetime } from '@/lib/format-to-datetime';
import { updateAppointment } from '@/services/appointments/update-appointment';
import { InferType } from 'yup';

export const AppointmentsMaintenance = () => {
  const [appointmentId, setAppointmentId] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const { action } = useParams();
  const { register, handleSubmit, setValue, control, watch, formState } =
    useForm<InferType<typeof appointmentSchema>>({
      resolver: yupResolver(appointmentSchema),
    });
  const { errors } = formState;

  const patientCPF = watch('patientCPF');
  const serviceId = watch('service');

  useEffect(() => {
    const fetchDentists = async () => {
      const response = await getDentists();

      setDentists(response);
    };

    const fetchServices = async () => {
      const response = await getServices();

      setServices(response);
    };

    fetchDentists();
    fetchServices();
  }, [action, setValue]);

  useEffect(() => {
    const fillDefaultValues = () => {
      const selectedAppointment = JSON.parse(
        localStorage.getItem('selectedAppointment')!
      );

      setValue(
        'date',
        formatToDatetime(selectedAppointment.date) as unknown as Date
      );
      if (selectedAppointment.dentist?.id)
        setValue('dentistId', selectedAppointment.dentist.id);
      setValue('patientCPF', selectedAppointment.patient.cpf);
      setValue('patientName', selectedAppointment.patient.name);

      setSelectedServices(selectedAppointment.services);
      setAppointmentId(selectedAppointment.id);
    };

    if (action === 'edit') fillDefaultValues();
  }, [action, setValue, dentists]);

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await getPatientById('cpf', patientCPF);

      setPatient(response[0]);
      setValue('patientName', response[0].name);
    };

    if (patientCPF?.length === 14) {
      fetchPatient();
    } else {
      setValue('patientName', '');
    }
  }, [patientCPF, setValue]);

  const handleServiceSelection = () => {
    if (!serviceId) return;

    const selectedService = services.filter(
      service => service.id === serviceId
    );

    setSelectedServices(prev => [...prev, ...selectedService]);
  };

  const onSubmit = useCallback(
    async (data: AppointmentsFormData) => {
      if (!selectedServices.length) {
        toast('Selecione ao menos um serviço', {
          duration: 3000,
          style: errorToast,
        });

        return;
      }

      if (!patient || !data.patientName) {
        toast('O paciente não está cadastrado', {
          duration: 3000,
          style: errorToast,
        });

        return;
      }

      const appointment: AppointmentDTO = {
        date: data.date,
        dentist: data.dentistId,
        patient: patient.id,
        services: selectedServices.map(service => service.id),
      };

      if (action === 'new') {
        await createAppointment(appointment);
      } else {
        await updateAppointment(appointmentId!, appointment);
      }
    },
    [action, appointmentId, patient, selectedServices]
  );

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar />
      <PageTitle
        title={
          action === 'new' ? 'Novo agendamento' : 'Atualização de agendamento'
        }
        backPath="/appointments"
      />
      <div className="flex flex-col p-6 items-center w-full h-full">
        <form className="flex flex-col gap-10 w-[60%] mt-8">
          <div className="flex items-end gap-3 w-full justify-center">
            <div className="relative flex flex-col w-1/2">
              <label htmlFor="patientCPF">CPF do paciente</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register('patientCPF', {
                  onChange: e => {
                    const formattedValue = formatInput(e.target.value, 'cpf');
                    setValue('patientCPF', formattedValue);
                  },
                })}
              />
              {errors.patientCPF && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.patientCPF.message}
                </span>
              )}
            </div>

            <div className="w-1/2">
              <input
                disabled
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register('patientName')}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex flex-col w-full">
              <label htmlFor="dentistId">Dentista</label>
              <Controller
                name="dentistId"
                control={control}
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full rounded-md border-2  text-sm focus:outline-0 bg-[#F3F3F3] focus:border-gray-400">
                        <SelectValue placeholder="Escolha um dentista" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-800">
                        {dentists && dentists.length ? (
                          dentists?.map(dentist => {
                            return (
                              <SelectItem key={dentist.id} value={dentist.id}>
                                {dentist.name}
                              </SelectItem>
                            );
                          })
                        ) : (
                          <SelectItem disabled={true} value="nenhum-valor">
                            Nenhum dentista cadastrado
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              {errors.dentistId && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.dentistId.message}
                </span>
              )}
            </div>

            <div className="relative flex flex-col w-1/2">
              <label htmlFor="date">Data / hora</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="datetime-local"
                {...register('date')}
              />
              {errors.date && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.date.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 items-end">
            <div className="w-full">
              <label htmlFor="service">Serviço</label>
              <Controller
                name="service"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      value={field.value as string}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full rounded-md border-2  text-sm focus:outline-0 bg-[#F3F3F3] focus:border-gray-400">
                        <SelectValue placeholder="Escolha um serviço" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-800">
                        {services && services.length ? (
                          services?.map(service => {
                            return (
                              <SelectItem key={service.id} value={service.id}>
                                {service.description}
                              </SelectItem>
                            );
                          })
                        ) : (
                          <SelectItem disabled={true} value="nenhum-valor">
                            Nenhum serviço cadastrado
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>

            <button
              className="flex items-center justify-center cursor-pointer  w-[40px] h-[35px] transition-colors ease duration-[0.3s] bg-cyan-300 hover:bg-cyan-200 rounded-[6px]"
              type="button"
              onClick={handleServiceSelection}
            >
              <FaCirclePlus size={20} color="white" />
            </button>
          </div>
        </form>

        <div className="flex flex-col relative  rounded-lg w-[60%] mt-10">
          <Table className="justify-self-center rounded-t-4">
            <TableHeader className="bg-[#00AEC7]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[35%] text-white ml-0.5 rounded-tl-2xl font-semibold text-base">
                  Descrição
                </TableHead>
                <TableHead className="w-[25%] text-white ml-0.5 font-semibold text-base">
                  Categoria
                </TableHead>
                <TableHead className="w-[20%] text-white ml-0.5 font-semibold text-base">
                  Duração (min)
                </TableHead>
                <TableHead className="w-[15%] text-white ml-0.5 font-semibold text-base">
                  Valor
                </TableHead>

                <TableHead className="w-[5%] text-white rounded-tr-2xl font-semibold text-base" />
              </TableRow>
            </TableHeader>
          </Table>

          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            <Table className="justify-self-center rounded-t-4">
              <TableBody>
                {selectedServices.map((row, index) => (
                  <TableRow
                    className={`flex font-semibold text-base text-gray-600 ${
                      index % 2 === 0 ? 'bg-[#EFFCFF]' : 'bg-[#C7D8DA]'
                    }`}
                    key={row.id}
                  >
                    <TableCell className="w-[35%]">{row.description}</TableCell>
                    <TableCell className="w-[25%]">{row.category}</TableCell>

                    <TableCell className="w-[20%]">{row.duration}</TableCell>

                    <TableCell className="w-[12%]">
                      {row.unitAmount.toLocaleString('pt-br', {
                        currency: 'BRL',
                        style: 'currency',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>

                    <TableCell className="w-[5%] flex items-center justify-start">
                      <button
                        className="flex ml-2 items-center justify-center cursor-pointer p-[4px] w-[30px] h-[30px] transition-colors ease duration-[0.3s]  bg-red-400 hover:bg-red-300 rounded-[6px]"
                        type="button"
                        onClick={() => {
                          setSelectedServices(prev =>
                            prev.filter(service => service.id !== row.id)
                          );
                        }}
                      >
                        <FaTrash color="white" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {selectedServices.length === 0 && (
            <div className="text-gray-600 m-0 p-2 bg-gray-100 font-semibold text-lg text-center">
              Nenhum serviço selecionado
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-2 self-end mt-40 mr-30"
        >
          <button
            className="flex items-center justify-center cursor-pointer  w-[40px] h-[35px] transition-colors ease duration-[0.3s] bg-red-400 hover:bg-red-300 rounded-[6px]"
            type="button"
          >
            <FaCircleXmark size={20} color="white" />
          </button>
          <button
            className="flex items-center justify-center cursor-pointer  w-[40px] h-[35px] transition-colors ease duration-[0.3s] bg-green-300 hover:bg-green-200 rounded-[6px]"
            type="submit"
          >
            <FaCircleCheck size={20} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
};
