import { AppointmentsInfo } from '@/components/appointments-info';
import { Menu } from '@/components/menu';
import Toolbar from '@/components/toolbar';

export const Home = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <Toolbar />
      <AppointmentsInfo />
      <Menu />
    </div>
  );
};
