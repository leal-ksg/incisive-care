import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/home";
import { Appointments } from "./components/pages/appointments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  );
}

export default App;
