import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DonorProfile from './components/DonorProfile';
import HospitalRegister from './components/HospitalRegister';
import DonorForm from './components/DonorForm';
import HospitalDashboard from './components/HospitalDashboard';
import HospitalLogin from './components/HospitalLogin';
import PrivateRoute from './components/PrivateRoute';
import DonorRequests from './components/DonorRequests';
import HospitalRequests from './components/HospitalRequests';
import DonorAppointmentForm from './components/DonorAppointmenForm';
import DonorAppointments from './components/DonorAppointments';
import HospitalAppointments from './components/HospitalAppointments';
import BloodRequestForm from './components/hospitalBloodRequestForm';
import AdminPanel from './components/AdminPanel';
import DonorSearch from './components/DonorSearch';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Unauthorised from './components/Unauthorised';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/donor/register" element={<DonorForm />} />
        <Route path="/hospital/register" element={<HospitalRegister />} />


        {/* Private/Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="donor">
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/donor/profile"
          element={
            <PrivateRoute role="donor">
              <DonorProfile />
              </PrivateRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <PrivateRoute role="donor">
              <DonorRequests />
            </PrivateRoute>
          }
        />

        <Route
          path="/hospital/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={['hospital']}>
              <HospitalDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/myrequests"
          element={
            <PrivateRoute role="hospital">
              <HospitalRequests />
            </PrivateRoute>
          }
        />

        <Route
          path="/donor/appointments"
          element={
            <PrivateRoute role="donor">
              <DonorAppointments />
            </PrivateRoute>
          }
        />

        <Route
          path="/donor/book"
          element={
            <PrivateRoute role="donor">
              <DonorAppointmentForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/hospital/appointments"
          element={
            <PrivateRoute role="hospital">
              <HospitalAppointments />
            </PrivateRoute>
          }
        />
        <Route path="/search/donors"
          element={
            <PrivateRoute><DonorSearch />
            </PrivateRoute>
          }
        />

        <Route
          path="/submit/request"
          element={
            <PrivateRoute>
              <BloodRequestForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </RoleProtectedRoute>
          }
        />
        <Route path="/unauthorised"
          element={
            <Unauthorised />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
