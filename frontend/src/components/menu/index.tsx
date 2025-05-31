import { useNavigate } from 'react-router-dom';
import { MenuButton } from '../menu-button';

export const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mt-15 flex gap-5">
        <MenuButton
          image="/patients.png"
          title="Pacientes"
          onClick={() => navigate('/patients')}
        />
        <MenuButton
          image="/dentists.png"
          title="Dentistas"
          onClick={() => navigate('/dentists')}
        />
        <MenuButton
          image="/services.png"
          title="Serviços"
          onClick={() => navigate('/services')}
        />
        <MenuButton
          image="/users.png"
          title="Usuários"
          onClick={() => navigate('/users')}
        />
      </div>
    </div>
  );
};
