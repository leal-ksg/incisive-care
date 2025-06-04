import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { formatInput } from '@/lib/format-input';

import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { InferType } from 'yup';
import { Dentist } from '@/domains/types';
import { createDentistSchema } from '../../../../../../common/validation/dentist/create-dentist-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { createDentist } from '@/services/dentists/create-dentist';
import { updateDentist } from '@/services/dentists/update-dentist';

type DentistFormData = InferType<typeof createDentistSchema>;

export const DentistsMaintenance = () => {
  const [dentist, setDentist] = useState<Dentist>();

  const { action } = useParams();
  const { register, handleSubmit, setValue, formState } =
    useForm<DentistFormData>({
      resolver: yupResolver(createDentistSchema),
    });
  const { errors } = formState;

  const navigate = useNavigate();

  useEffect(() => {
    const fillDefaultValues = () => {
      const selectedDentist: Dentist = JSON.parse(
        localStorage.getItem('selectedDentist')!
      );

      setValue('license', selectedDentist.license);
      setValue('name', selectedDentist.name);
      setValue('cpf', selectedDentist.cpf);
      setValue('phone', selectedDentist.phone);

      setDentist(selectedDentist);
    };

    if (action === 'edit') fillDefaultValues();
  }, [action, setValue]);

  const onSubmit = useCallback(
    async (data: DentistFormData) => {
      if (action === 'new') {
        await createDentist(data);
      } else {
        await updateDentist({ ...data, id: dentist!.id });
      }
    },
    [action, dentist]
  );

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle
        title={
          action === 'new' ? 'Cadastro de dentista' : 'Atualização de dentista'
        }
        backPath="/dentists"
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
              <label htmlFor="license">Licensa CRO</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="text"
                {...register('license', {
                  onChange: e => {
                    const formattedValue = formatInput(e.target.value, 'cro');
                    setValue('license', formattedValue);
                  },
                })}
              />
              {errors.license && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.license.message}
                </span>
              )}
            </div>
          </div>
          <div className="fixed right-40 bottom-30 flex gap-2">
            <button
              onClick={() => navigate('/dentists')}
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
