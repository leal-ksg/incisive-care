import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { formatInput } from '@/lib/format-input';

import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { InferType } from 'yup';
import { Patient } from '@/domains/types';
import { createPatientSchema } from '../../../../../../common/validation/patient/create-patient-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPatient } from '@/services/patients/create-patient';
import { updatePatient } from '@/services/patients/update-patient';

type PatientFormData = InferType<typeof createPatientSchema>;

export const PatientsMaintenance = () => {
  const [patient, setPatient] = useState<Patient>();

  const { action } = useParams();
  const { register, handleSubmit, setValue, formState } =
    useForm<PatientFormData>({
      resolver: yupResolver(createPatientSchema),
    });
  const { errors } = formState;

  const navigate = useNavigate();

  useEffect(() => {
    const fillDefaultValues = () => {
      const selectedPatient: Patient = JSON.parse(
        localStorage.getItem('selectedPatient')!
      );

      setValue(
        'dateOfBirth',
        new Date(selectedPatient.dateOfBirth)
          .toISOString()
          .split('T')[0] as unknown as Date
      );
      setValue('name', selectedPatient.name);
      setValue('cpf', selectedPatient.cpf);
      setValue('phone', selectedPatient.phone);

      setPatient(selectedPatient);
    };

    if (action === 'edit') fillDefaultValues();
  }, [action, setValue]);

  const onSubmit = useCallback(
    async (data: PatientFormData) => {
      if (action === 'new') {
        await createPatient(data);
      } else {
        await updatePatient({ ...data, id: patient!.id });
      }
    },
    [action, patient]
  );

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle
        title={
          action === 'new' ? 'Cadastro de paciente' : 'Atualização de paciente'
        }
        backPath="/patients"
      />
      <div className="flex h-full w-full flex-col items-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex w-[60%] flex-col gap-10"
        >
          <div className="flex w-full items-end justify-center gap-3">
            <div className="relative flex w-1/3 flex-col">
              <label htmlFor="cpf">CPF</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="text"
                {...register('cpf', {
                  onChange: e => {
                    const formattedValue = formatInput(e.target.value, 'cpf');
                    setValue('cpf', formattedValue);
                  },
                })}
              />
              {errors.cpf && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.cpf.message}
                </span>
              )}
            </div>

            <div className="relative flex w-full flex-col">
              <label htmlFor="name">Nome</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="text"
                {...register('name')}
              />
              {errors.name && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="phone">Telefone</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="text"
                {...register('phone', {
                  onChange: e => {
                    const formattedValue = formatInput(e.target.value, 'phone');
                    setValue('phone', formattedValue);
                  },
                })}
              />
              {errors.phone && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="dateOfBirth">Data de nascimento</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="date"
                {...register('dateOfBirth')}
              />
              {errors.dateOfBirth && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>
          <div className="fixed right-40 bottom-30 flex gap-2">
            <button
              onClick={() => navigate('/patients')}
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
          </div>
        </form>
      </div>
    </div>
  );
};
