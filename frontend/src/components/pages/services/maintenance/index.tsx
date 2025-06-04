import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';

import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { InferType } from 'yup';
import { Service } from '@/domains/types';
import { createServiceSchema } from '../../../../../../common/validation/service/create-service-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { createService } from '@/services/services/create-service';
import { updateService } from '@/services/services/update-service';

type ServiceFormData = InferType<typeof createServiceSchema>;

export const ServicesMaintenance = () => {
  const [service, setService] = useState<Service>();

  const { action } = useParams();
  const { register, handleSubmit, setValue, formState } =
    useForm<ServiceFormData>({
      resolver: yupResolver(createServiceSchema),
    });
  const { errors } = formState;

  const navigate = useNavigate();

  useEffect(() => {
    const fillDefaultValues = () => {
      const selectedService: Service = JSON.parse(
        localStorage.getItem('selectedService')!
      );

      setValue('category', selectedService.category);
      setValue('description', selectedService.description);
      setValue('duration', selectedService.duration);
      setValue('unitAmount', selectedService.unitAmount);

      setService(selectedService);
    };

    if (action === 'edit') fillDefaultValues();
  }, [action, setValue]);

  const onSubmit = useCallback(
    async (data: ServiceFormData) => {
      if (action === 'new') {
        await createService(data);
      } else {
        await updateService({ ...data, id: service!.id });
      }
    },
    [action, service]
  );

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle
        title={
          action === 'new' ? 'Cadastro de serviço' : 'Atualização de serviço'
        }
        backPath="/services"
      />
      <div className="flex h-full w-full flex-col items-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex w-[60%] flex-col gap-10"
        >
          <div className="flex w-full items-end justify-center gap-3">
            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="description">Descrição</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="text"
                {...register('description')}
              />
              {errors.description && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="name">Categoria</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="text"
                {...register('category')}
              />
              {errors.category && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="duration">Duração (min)</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="number"
                {...register('duration')}
              />
              {errors.duration && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.duration.message}
                </span>
              )}
            </div>

            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="unitAmount">Valor unitário</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="number"
                step="any"
                {...register('unitAmount')}
              />
              {errors.unitAmount && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.unitAmount.message}
                </span>
              )}
            </div>
          </div>
          <div className="fixed right-40 bottom-30 flex gap-2">
            <button
              onClick={() => navigate('/services')}
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
