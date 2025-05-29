import { useForm } from 'react-hook-form';
import { FaAt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useAuth } from '../contexts/authContext';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Informe o e-mail')
    .test('validate e-mail', 'E-mail inválido', email => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }),
  password: Yup.string().required('Informe a senha'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors, isSubmitting } = formState;
  const { login } = useAuth();

  const onSubmit = async (data: Yup.InferType<typeof schema>) => {
    await login(data.email, data.password);
  };

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-[#37D0F5]">
      <div className="fixed top-0 bg-[#37D0F5] px-[51px] py-[76px]">
        <img
          className="fixed top-[70px] left-[180px] w-40"
          src="/logo.png"
          alt="logo"
        />
        <h1 className="fixed top-[90px] left-[260px] font-['Protest_Riot'] text-2xl font-bold text-white">
          Incisive Care
        </h1>
      </div>
      <div className="flex max-w-[500px] min-w-[500px] flex-col items-center justify-center rounded-lg bg-gray-100 p-9 shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[70%] flex-col gap-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="mt-5 text-2xl leading-0 font-bold">Login</h1>
          </div>

          <hr />

          <div>
            <label
              className="flex items-center gap-2 text-lg font-semibold text-cyan-500"
              htmlFor="password"
            >
              <FaAt />
              Email
            </label>
            <div className="flex w-full items-center gap-2">
              <input
                className="ease relative h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <span className="text-destructive absolute font-semibold">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="flex items-center gap-2 text-lg font-semibold text-cyan-500"
              htmlFor="password"
            >
              <FaLock />
              Senha
            </label>
            <div className="flex w-[110%] items-center gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                className="ease relative h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
                {...register('password')}
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <FaEyeSlash size={20} className="text-[#00AEC7]" />
                ) : (
                  <FaEye size={20} className="text-[#00AEC7]" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-destructive absolute font-semibold">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="ease mt-4 cursor-pointer bg-[#00AEC7] p-5 text-xl font-bold transition-colors duration-[0.2s] hover:bg-[#60b9c9]"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
