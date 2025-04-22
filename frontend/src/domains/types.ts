export interface AppointmentsDTO {
  patientId: string;
  dentistId: string;
  date: Date;
  status: string;
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
