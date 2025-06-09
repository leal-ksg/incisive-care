import { AppointmentsFormData } from '@/domains/types';
import * as Yup from 'yup';

export const appointmentSchema: Yup.ObjectSchema<AppointmentsFormData> =
  Yup.object().shape({
    patientCPF: Yup.string()
      .required('Campo obrigatório')
      .test('validate cpf', 'CPF inválido', (cpf: string) => {
        return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
      }),
    patientName: Yup.string().nullable().notRequired(),
    dentistId: Yup.string().required('Campo obrigatório'),
    date: Yup.date()
      .transform((value, originalValue) =>
        originalValue === '' ? null : value
      )
      .required('Campo obrigatório')
      .test(
        'validate date',
        'A data não pode ser anterior ao dia de hoje',
        date => {
          const today = new Date();
          return today <= date;
        }
      ),
    service: Yup.number().required('Campo obrigatório'),
  });
