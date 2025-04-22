import { useNavigate } from "react-router-dom";
import { MenuButton } from "../menu-button";

export const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="flex gap-5 mt-15">
        <MenuButton
          image="/patients.png"
          title="Pacientes"
          onClick={() => navigate("/patients")}
        />
        <MenuButton
          image="/dentists.png"
          title="Dentistas"
          onClick={() => navigate("/dentists")}
        />
        <MenuButton
          image="/services.png"
          title="Serviços"
          onClick={() => navigate("/services")}
        />
      </div>
    </div>
  );
};
