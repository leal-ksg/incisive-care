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

export const AppointmentsMaintenance = () => {
  const [appointmentId, setAppointmentId] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const { action } = useParams();
  const { register, handleSubmit, setValue, control, watch, formState } =
    useForm<AppointmentsFormData>({
      resolver: yupResolver(appointmentSchema),
      defaultValues: {
        dentistId: '',
        service: '',
      },
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
    console.log(serviceId);
    console.log(services);
    if (!serviceId) return;

    const selectedService = services.filter(
      service => service.id === +serviceId
    );

    console.log(selectedService);

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
      };

      if (action === 'new') {
        const newAppointment =  await createAppointment(appointment);
      } else {
        await updateAppointment(appointmentId!, appointment);
      }
    },
    [action, appointmentId, patient, selectedServices]
  );

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle
        title={
          action === 'new' ? 'Novo agendamento' : 'Atualização de agendamento'
        }
        backPath="/appointments"
      />
      <div className="flex h-full w-full flex-col items-center p-6">
        <form className="mt-8 flex w-[60%] flex-col gap-10">
          <div className="flex w-full items-end justify-center gap-3">
            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="patientCPF">CPF do paciente</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="text"
                {...register('patientCPF', {
                  onChange: e => {
                    const formattedValue = formatInput(e.target.value, 'cpf');
                    setValue('patientCPF', formattedValue);
                  },
                })}
              />
              {errors.patientCPF && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.patientCPF.message}
                </span>
              )}
            </div>

            <div className="w-1/2">
              <input
                disabled
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="text"
                {...register('patientName')}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex w-full flex-col">
              <label htmlFor="dentistId">Dentista</label>
              <Controller
                name="dentistId"
                control={control}
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full rounded-md border-2 bg-[#F3F3F3] text-sm focus:border-gray-400 focus:outline-0">
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
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.dentistId.message}
                </span>
              )}
            </div>

            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="date">Data / hora</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="datetime-local"
                {...register('date')}
              />
              {errors.date && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.date.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-end gap-3">
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
                      <SelectTrigger className="w-full rounded-md border-2 bg-[#F3F3F3] text-sm focus:border-gray-400 focus:outline-0">
                        <SelectValue placeholder="Escolha um serviço" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-800">
                        {services && services.length ? (
                          services?.map(service => {
                            return (
                              <SelectItem
                                key={service.id}
                                value={service.id.toString()}
                              >
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
              className="ease flex h-[35px] w-[40px] cursor-pointer items-center justify-center rounded-[6px] bg-cyan-300 transition-colors duration-[0.3s] hover:bg-cyan-200"
              type="button"
              onClick={handleServiceSelection}
            >
              <FaCirclePlus size={20} color="white" />
            </button>
          </div>
        </form>

        <div className="relative mt-10 flex w-[60%] flex-col rounded-lg">
          <Table className="rounded-t-4 justify-self-center">
            <TableHeader className="bg-[#00AEC7]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="ml-0.5 w-[35%] rounded-tl-2xl text-base font-semibold text-white">
                  Descrição
                </TableHead>
                <TableHead className="ml-0.5 w-[25%] text-base font-semibold text-white">
                  Categoria
                </TableHead>
                <TableHead className="ml-0.5 w-[20%] text-base font-semibold text-white">
                  Duração (min)
                </TableHead>
                <TableHead className="ml-0.5 w-[15%] text-base font-semibold text-white">
                  Valor
                </TableHead>

                <TableHead className="w-[5%] rounded-tr-2xl text-base font-semibold text-white" />
              </TableRow>
            </TableHeader>
          </Table>

          <div className="custom-scrollbar max-h-[500px] overflow-y-auto">
            <Table className="rounded-t-4 justify-self-center">
              <TableBody>
                {selectedServices.map((row, index) => (
                  <TableRow
                    className={`flex text-base font-semibold text-gray-600 ${
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

                    <TableCell className="flex w-[5%] items-center justify-start">
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-red-400 p-[4px] transition-colors duration-[0.3s] hover:bg-red-300"
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
            <div className="m-0 bg-gray-100 p-2 text-center text-lg font-semibold text-gray-600">
              Nenhum serviço selecionado
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-40 mr-30 flex gap-2 self-end"
        >
          <button
            className="ease flex h-[35px] w-[40px] cursor-pointer items-center justify-center rounded-[6px] bg-red-400 transition-colors duration-[0.3s] hover:bg-red-300"
            type="button"
          >
            <FaCircleXmark size={20} color="white" />
          </button>
          <button
            className="ease flex h-[35px] w-[40px] cursor-pointer items-center justify-center rounded-[6px] bg-green-300 transition-colors duration-[0.3s] hover:bg-green-200"
            type="submit"
          >
            <FaCircleCheck size={20} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
};
