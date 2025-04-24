import { PageTitle } from "@/components/page-title";
import Toolbar from "@/components/toolbar";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { formatInput } from "@/lib/format-input";

import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { InferType } from "yup";
import { Dentist } from "@/domains/types";
import { createDentistSchema } from "../../../../../../common/validation/dentist/create-dentist-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { createDentist } from "@/services/dentists/create-dentist";
import { updateDentist } from "@/services/dentists/update-dentist";

type DentistFormData = InferType<typeof createDentistSchema>;

export const DentistsMaintenance = () => {
  const [dentist, setDentist] = useState<Dentist>();

  const { action } = useParams();
  const { register, handleSubmit, setValue } = useForm<DentistFormData>({
    resolver: yupResolver(createDentistSchema),
  });

  useEffect(() => {
    const fillDefaultValues = () => {
      const selectedDentist: Dentist = JSON.parse(
        localStorage.getItem("selectedDentist")!
      );

      setValue("license", selectedDentist.license);
      setValue("name", selectedDentist.name);
      setValue("cpf", selectedDentist.cpf);
      setValue("phone", selectedDentist.phone);

      setDentist(selectedDentist);
    };

    if (action === "edit") fillDefaultValues();
  }, [action, setValue]);

  const onSubmit = useCallback(
    async (data: DentistFormData) => {
      if (action === "new") {
        await createDentist(data);
      } else {
        await updateDentist({ ...data, id: dentist!.id });
      }
    },
    [action, dentist]
  );

  return (
    <div className="flex flex-col w-full h-full">
      <Toolbar />
      <PageTitle
        title={
          action === "new" ? "Cadastro de dentista" : "Atualização de dentista"
        }
        backPath="/dentists"
      />
      <div className="flex flex-col p-6 items-center w-full h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-[60%] mt-8"
        >
          <div className="flex items-end gap-3 w-full justify-center">
            <div className="w-1/3">
              <label htmlFor="cpf">CPF</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register("cpf", {
                  onChange: (e) => {
                    const formattedValue = formatInput(e.target.value, "cpf");
                    setValue("cpf", formattedValue);
                  },
                })}
              />
            </div>

            <div className="w-full">
              <label htmlFor="name">Nome</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register("name")}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label htmlFor="phone">Telefone</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register("phone", {
                  onChange: (e) => {
                    const formattedValue = formatInput(e.target.value, "phone");
                    setValue("phone", formattedValue);
                  },
                })}
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="license">Licensa CRO</label>
              <input
                className="w-full p-3 bg-[#F3F3F3] h-[36px] rounded-md border-2 text-sm focus:outline-0 focus:border-gray-400 transition-colors ease duration-[0.2s]"
                type="text"
                {...register("license", {
                  onChange: (e) => {
                    const formattedValue = formatInput(e.target.value, "cro");
                    setValue("license", formattedValue);
                  },
                })}
              />
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
