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
    <div className="flex flex-col w-full h-full">
      <Toolbar />
      <PageTitle
        title={
          action === 'new' ? 'Cadastro de paciente' : 'Atualização de paciente'
        }
        backPath="/patients"
      />
      <div className="flex flex-col p-6 items-center w-full h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-[60%] mt-8"
        >
          <div className="flex items-end gap-3 w-full justify-center">
            <div className="relative flex flex-col w-1/3">
              <label htmlFor="cpf">CPF</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register('cpf', {
                  onChange: e => {
                    const formattedValue = formatInput(e.target.value, 'cpf');
                    setValue('cpf', formattedValue);
                  },
                })}
              />
              {errors.cpf && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.cpf.message}
                </span>
              )}
            </div>

            <div className="relative flex flex-col w-full">
              <label htmlFor="name">Nome</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register('name')}
              />
              {errors.name && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex flex-col w-1/2">
              <label htmlFor="phone">Telefone</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register('phone', {
                  onChange: e => {
                    const formattedValue = formatInput(e.target.value, 'phone');
                    setValue('phone', formattedValue);
                  },
                })}
              />
              {errors.phone && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="relative flex flex-col w-1/2">
              <label htmlFor="dateOfBirth">Data de nascimento</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="date"
                {...register('dateOfBirth')}
              />
              {errors.dateOfBirth && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 fixed bottom-30 right-40">
            <button
              onClick={() => navigate('/patients')}
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
          </div>
        </form>
      </div>
    </div>
  );
};
