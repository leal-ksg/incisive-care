import { Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/home';
import { Appointments } from './components/pages/appointments';
import { AppointmentsMaintenance } from './components/pages/appointments/maintenance';
import { Patients } from './components/pages/patients';
import { PatientsMaintenance } from './components/pages/patients/maintenance';
import { Dentists } from './components/pages/dentists';
import { DentistsMaintenance } from './components/pages/dentists/maintenance';
import { Services } from './components/pages/services';
import { ServicesMaintenance } from './components/pages/services/maintenance';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Appointments */}
      <Route path="/appointments" element={<Appointments />} />
      <Route
        path="/appointments/:action"
        element={<AppointmentsMaintenance />}
      />

      {/* Patients */}
      <Route path="/patients" element={<Patients />} />
      <Route path="/patients/:action" element={<PatientsMaintenance />} />

      {/* Dentists */}
      <Route path="/dentists" element={<Dentists />} />
      <Route path="/dentists/:action" element={<DentistsMaintenance />} />

      {/* Services */}
      <Route path="/services" element={<Services />} />
      <Route path="/services/:action" element={<ServicesMaintenance />} />
    </Routes>
  );
}

export default App;
