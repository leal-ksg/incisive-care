import { PageTitle } from '@/components/page-title';
import Toolbar from '@/components/toolbar';
import { User } from '@/domains/types';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaPlusCircle, FaPen, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '@/services/users/delete-user';
import { getUsers } from '@/services/users/get-users';

export const Users = () => {
  const [shouldReload, setShoudReload] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const usersPatients = async () => {
      const response = await getUsers();

      setUsers(response);
    };

    usersPatients();
  }, [shouldReload]);

  const handleUserDelete = async (id: number) => {
    const deleted = await deleteUser(id);

    if (deleted) setShoudReload(prev => !prev);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Toolbar />
      <PageTitle title="Usuários" backPath="/" />
      <div className="flex h-full w-full justify-center p-6">
        <div className="relative mt-20 flex w-[70%] flex-col rounded-lg">
          <div className="mb-2 flex items-center justify-center gap-2">
            <input
              className="ease h-[36px] w-full rounded-md border-2 bg-[#F3F3F3] p-3 text-sm transition-colors duration-[0.2s] focus:border-gray-400 focus:outline-0"
              type="text"
            />
            <button
              onClick={() => navigate('/users/new')}
              className="ease flex cursor-pointer rounded-md bg-[#00AEC7] p-2 font-bold text-white transition-colors duration-[0.2s] hover:bg-[#63daec]"
            >
              <FaPlusCircle size={20} />
            </button>
          </div>
          <Table className="rounded-t-4 justify-self-center">
            <TableHeader className="bg-[#00AEC7]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="ml-0.5 w-[30%] rounded-tl-2xl text-base font-semibold text-white">
                  Nome
                </TableHead>
                <TableHead className="ml-0.5 w-[30%] text-base font-semibold text-white">
                  E-mail
                </TableHead>
                <TableHead className="ml-0.5 w-[13%] text-base font-semibold text-white">
                  Role
                </TableHead>
                <TableHead className="ml-0.5 w-[13%] text-base font-semibold text-white">
                  Data de cadastro
                </TableHead>
                <TableHead className="w-[4%] rounded-tr-2xl text-base font-semibold text-white" />
              </TableRow>
            </TableHeader>
          </Table>

          <div className="custom-scrollbar max-h-[500px] overflow-y-auto">
            <Table className="rounded-t-4 justify-self-center">
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    className={`flex text-base font-semibold text-gray-600 ${
                      index % 2 === 0 ? 'bg-[#EFFCFF]' : 'bg-[#C7D8DA]'
                    }`}
                    key={user.id}
                  >
                    <TableCell className="w-[33.5%]">{user?.name}</TableCell>
                    <TableCell className="w-[33%]">{user?.email}</TableCell>

                    <TableCell className="w-[14.5%]">
                      {user?.role?.toUpperCase()}
                    </TableCell>

                    <TableCell className="w-[12%]">
                      {new Intl.DateTimeFormat('pt-BR').format(
                        new Date(user.createdAt)
                      )}
                    </TableCell>

                    <TableCell className="flex w-[4%] items-center justify-start">
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-cyan-300 p-[4px] transition-colors duration-[0.3s] hover:bg-cyan-200"
                        type="button"
                        onClick={() => {
                          localStorage.setItem(
                            'selectedPatient',
                            JSON.stringify(user)
                          );
                          navigate('/patients/edit');
                        }}
                      >
                        <FaPen color="white" />
                      </button>
                      <button
                        className="ease ml-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[6px] bg-red-400 p-[4px] transition-colors duration-[0.3s] hover:bg-red-300"
                        type="button"
                        onClick={() => handleUserDelete(user.id)}
                      >
                        <FaTrash color="white" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {users.length === 0 && (
            <div className="m-0 bg-gray-100 p-2 text-center text-lg font-semibold text-gray-800">
              Nenhum usuário cadastrado ainda...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
