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
import Login from './components/pages/login';
import { AuthProvider } from './contexts/auth-context';
import { PrivateRoute } from './components/private-route';
import { Users } from './components/pages/users';
import { UsersMaintenance } from './components/pages/users/maintenance';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Appointments */}
        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments/:action"
          element={
            <PrivateRoute>
              <AppointmentsMaintenance />
            </PrivateRoute>
          }
        />

        {/* Patients */}
        <Route
          path="/patients"
          element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/:action"
          element={
            <PrivateRoute>
              <PatientsMaintenance />
            </PrivateRoute>
          }
        />

        {/* Users */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:action"
          element={
            <PrivateRoute>
              <UsersMaintenance />
            </PrivateRoute>
          }
        />

        {/* Dentists */}
        <Route
          path="/dentists"
          element={
            <PrivateRoute>
              <Dentists />
            </PrivateRoute>
          }
        />
        <Route
          path="/dentists/:action"
          element={
            <PrivateRoute>
              <DentistsMaintenance />
            </PrivateRoute>
          }
        />

        {/* Services */}
        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/:action"
          element={
            <PrivateRoute>
              <ServicesMaintenance />
            </PrivateRoute>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
