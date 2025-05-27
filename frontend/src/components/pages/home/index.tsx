import { AppointmentsInfo } from '@/components/appointments-info';
import { Menu } from '@/components/menu';
import Toolbar from '@/components/toolbar';

export const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Toolbar />
      <AppointmentsInfo />
      <Menu />
    </div>
  );
};
