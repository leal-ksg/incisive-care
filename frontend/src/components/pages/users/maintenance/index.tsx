import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { User, UserFormData } from '@/domains/types';
import { createUserSchema } from '../../../../../../common/validation/user/create-user-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUser } from '@/services/users/create-user';
import { updateUser } from '@/services/users/update-user';
import { toast } from 'sonner';
import { errorToast } from '@/lib/toast-styles';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const UsersMaintenance = () => {
  const [user, setUser] = useState<User>();
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { action } = useParams();
  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: yupResolver(createUserSchema, {}),
    context: {
      isEdit: action === 'edit',
    },
    defaultValues: {
      name: '',
      email: '',
      role: 'dentist',
      password: '',
    },
  });
  const { errors } = formState;

  const navigate = useNavigate();
  const roles = useMemo(
    () => [
      { label: 'Administrador', value: 'admin' },
      { label: 'Dentista', value: 'dentist' },
    ],
    []
  );

  useEffect(() => {
    const fillDefaultValues = () => {
      const selectedUser: User = JSON.parse(
        localStorage.getItem('selectedUser')!
      );
      const { email, name, role } = selectedUser;

      reset({
        email,
        name,
        role,
      });

      setUser(selectedUser);
    };

    if (action === 'edit') fillDefaultValues();
  }, [action, reset]);

  const onSubmit = useCallback(
    async (data: UserFormData) => {
      if (data.password) {
        if (data.password !== passwordConfirmation) {
          toast('As senhas não são iguais', {
            duration: 3000,
            style: errorToast,
          });
          return;
        }
      }

      if (action === 'new') {
        await createUser({
          ...data,
          role: data.role as 'admin' | 'dentist',
        });
      } else if (user) {
        await updateUser({ ...data, id: user.id });
      }
    },
    [action, user, passwordConfirmation, navigate]
  );

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle
        title={
          action === 'new' ? 'Cadastro de usuário' : 'Atualização de usuário'
        }
        backPath="/users"
      />
      <div className="flex h-full w-full flex-col items-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex w-[60%] flex-col gap-10"
        >
          <div className="flex gap-3">
            <div className="relative flex w-1/2 flex-col">
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

            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="role">Função</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full rounded-md border-2 bg-[#F3F3F3]">
                      <SelectValue placeholder="Escolha uma opção" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md border-2">
                      {roles.map(role => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.role.message}
                </span>
              )}
            </div>
          </div>

          <div className="relative flex w-full flex-col">
            <label htmlFor="email">E-mail</label>
            <input
              className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
              type="text"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-destructive absolute top-[100%] font-semibold">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="password">Senha</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <span className="text-destructive absolute top-[100%] font-semibold">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="relative flex w-1/2 flex-col">
              <label htmlFor="passwordConfirmation">Confirme a senha</label>
              <input
                className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                type="password"
                name="passwordConfirmation"
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </div>
          </div>

          <div className="fixed right-40 bottom-30 flex gap-2">
            <button
              onClick={() => navigate('/users')}
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
