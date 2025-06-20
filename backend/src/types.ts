export interface User {
  role: 'admin' | 'dentist';
  email: string;
  name: string;
}

export interface AppointmentServicesDTO {
  appointmentId: string;
  services: number[];
}
