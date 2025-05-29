import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { User } from '@/domains/types';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { errorToast } from '@/lib/toast-styles';

interface AuthContextData {
  user: User | undefined;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (!user) {
      localStorage.clear();
    } else {
      setUser(user);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        {
          email,
          password,
        }
      );

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data?.accessToken) {
        console.log(data?.accessToken);
        localStorage.setItem('accessToken', data.accessToken);

        api.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
      }

      navigate('/');
    } catch (error) {
      console.log(error);
      toast('Usuário ou senha inválidos', {
        style: errorToast,
        duration: 2000,
      });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setUser(undefined);

    navigate('/login');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
};
