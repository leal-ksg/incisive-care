import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/home";
import { Appointments } from "./components/pages/appointments";
import { AppointmentsMaintenance } from "./components/pages/appointments/maintenance";

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
    </Routes>
  );
}

export default App;
