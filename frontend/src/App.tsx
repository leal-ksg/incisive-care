import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/home";
import { Appointments } from "./components/pages/appointments";
import { AppointmentsMaintenance } from "./components/pages/appointments/maintenance";
import { Patients } from "./components/pages/patients";
import { PatientsMaintenance } from "./components/pages/patients/maintenance";
import { Dentists } from "./components/pages/dentists";

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
      {/* <Route path="/dentists/:action" element={<dentistsMaintenance />} /> */}

  
    </Routes>
  );
}

export default App;
