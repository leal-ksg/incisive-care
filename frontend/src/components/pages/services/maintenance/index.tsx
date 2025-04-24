import { PageTitle } from "@/components/page-title";
import Toolbar from "@/components/toolbar";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { InferType } from "yup";
import { Service } from "@/domains/types";
import { createServiceSchema } from "../../../../../../common/validation/service/create-service-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { createService } from "@/services/services/create-service";
import { updateService } from "@/services/services/update-service";

type ServiceFormData = InferType<typeof createServiceSchema>;

export const ServicesMaintenance = () => {
  const [service, setService] = useState<Service>();

  const { action } = useParams();
  const { register, handleSubmit, setValue, formState } =
    useForm<ServiceFormData>({
      resolver: yupResolver(createServiceSchema),
    });
  const { errors } = formState;

  useEffect(() => {
    const fillDefaultValues = () => {
      const selectedService: Service = JSON.parse(
        localStorage.getItem("selectedService")!
      );

      setValue("category", selectedService.category);
      setValue("description", selectedService.description);
      setValue("duration", selectedService.duration);
      setValue("unitAmount", selectedService.unitAmount);

      setService(selectedService);
    };

    if (action === "edit") fillDefaultValues();
  }, [action, setValue]);

  const onSubmit = useCallback(
    async (data: ServiceFormData) => {
      if (action === "new") {
        await createService(data);
      } else {
        await updateService({ ...data, id: service!.id });
      }
    },
    [action, service]
  );

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar />
      <PageTitle
        title={
          action === "new" ? "Cadastro de serviço" : "Atualização de serviço"
        }
        backPath="/services"
      />
      <div className="flex flex-col p-6 items-center w-full h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-[60%] mt-8"
        >
          <div className="flex items-end gap-3 w-full justify-center">
            <div className="relative flex flex-col w-1/2">
              <label htmlFor="description">Descrição</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register("description")}
              />
              {errors.description && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="relative flex flex-col w-1/2">
              <label htmlFor="name">Categoria</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register("category")}
              />
              {errors.category && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex flex-col w-1/2">
              <label htmlFor="duration">Duração (min)</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="number"
                {...register("duration")}
              />
              {errors.duration && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.duration.message}
                </span>
              )}
            </div>

            <div className="relative flex flex-col w-1/2">
              <label htmlFor="unitAmount">Valor unitário</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="number"
                {...register("unitAmount")}
              />
              {errors.unitAmount && (
                <span className="absolute top-[100%] text-destructive font-semibold">
                  {errors.unitAmount.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 fixed bottom-30 right-40">
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
          </div>
        </form>
      </div>
    </div>
  );
};
