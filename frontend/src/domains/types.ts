export interface AppointmentDTO {
  patient: string;
  dentist: string;
  date: Date;
}

export interface Service {
  description: string;
  category: string;
  duration: number;
  unitAmount: number;
  id: number;
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
  id: string;
}

export interface AppointmentsCount {
  _id: string;
  total: number;
}

export interface AppointmentsFormData {
  patientCPF: string;
  patientName?: string | null;
  dentistId: string;
  date: Date;
  service: number | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'dentist';
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: string;
}

export interface AppointmentServicesDTO {
  appointmentId: string;
  services: ServiceDTO[];
}

export interface ServiceDTO {
  serviceId: number;
  unityAmount: number;
}

export interface AppointmentService {
  id: number;
  appointmentId: string;
  serviceId: number;
  unitAmount: number;
}
