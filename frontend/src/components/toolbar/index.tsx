import { useLocation } from 'react-router-dom';

const Toolbar = () => {
  const { pathname } = useLocation();

  return pathname === '/' ? (
    <div className="bg-[#37D0F5] w-full h-[320px] px-[51px] py-[76px]">
      <img
        className="w-50 absolute top-[90px] left-[180px]"
        src="/logo.png"
        alt="logo"
      />
      <h1 className="absolute top-[115px] left-[278px] text-white font-bold font-['Protest_Riot'] text-4xl">
        Incisive Care
      </h1>

      <img
        className="absolute top-0 right-[140px] w-100"
        src="/dentist.png"
        alt="dentist"
      />
    </div>
  ) : (
    <div className="bg-[#37D0F5] w-full h-[110px]">
      <img
        className="w-30 absolute top-4 left-[50px]"
        src="/logo.png"
        alt="logo"
      />
      <h1 className="absolute text-white top-[25px] left-[110px] font-bold font-['Protest_Riot'] text-2xl">
        Incisive Care
      </h1>
    </div>
  );
};

export default Toolbar;
