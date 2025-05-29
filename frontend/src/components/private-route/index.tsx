import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')!);

    if (!user && !storedUser) navigate('/login');
  }, []);

  return children;
};
