export interface AppointmentDTO {
  patient: string;
  dentist: string;
  date: Date;
  services: string[];
}

export interface Service {
  description: string;
  category: string;
  duration: number;
  unitAmount: number;
  id: string;
}

export interface Patient {
  name: string;
  cpf: string;
  dateOfBirth: Date;
  phone: string;
  id: string;
}

export interface Dentist {
  name: string;
  cpf: string;
  license: string;
  phone: string;
  id: string;
}

export interface Appointment {
  patient: Patient;
  dentist: Dentist;
  date: Date;
  status: string;
  services: Service[];
  id: string;
}

export interface AppointmentsCount {
  _id: string;
  total: number;
}

export interface AppointmentsFormData {
  patientName: string | null | undefined;
  service: string | null | undefined;
  patientCPF: string;
  dentistId: string;
  date: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'dentist';
  createdAt: string;
  updatedAt: string;
}
