import { useLocation } from 'react-router-dom';
import { FaRightFromBracket } from 'react-icons/fa6';
import { useAuth } from '@/contexts/auth-context';

const Toolbar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return pathname === '/' ? (
    <div className="h-[320px] w-full bg-[#37D0F5] px-[51px] py-[76px]">
      <img
        className="absolute top-[90px] left-[180px] w-50"
        src="/logo.png"
        alt="logo"
      />
      <h1 className="absolute top-[115px] left-[278px] font-['Protest_Riot'] text-4xl font-bold text-white">
        Incisive Care
      </h1>

      <img
        className="absolute top-0 right-[140px] w-100"
        src="/dentist.png"
        alt="dentist"
      />

      <button
        onClick={logout}
        type="button"
        className="absolute top-8 right-10 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-[0.3s] ease-in hover:cursor-pointer hover:bg-sky-400/70"
      >
        Sair
        <FaRightFromBracket />
      </button>
    </div>
  ) : (
    <div className="h-[110px] w-full bg-[#37D0F5]">
      <img
        className="absolute top-4 left-[50px] w-30"
        src="/logo.png"
        alt="logo"
      />
      <h1 className="absolute top-[25px] left-[110px] font-['Protest_Riot'] text-2xl font-bold text-white">
        Incisive Care
      </h1>

      <button
        onClick={logout}
        type="button"
        className="absolute top-8 right-10 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-[0.3s] ease-in hover:cursor-pointer hover:bg-sky-400/70"
      >
        Sair
        <FaRightFromBracket />
      </button>
    </div>
  );
};

export default Toolbar;
