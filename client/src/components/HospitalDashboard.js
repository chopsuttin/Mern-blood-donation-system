import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const HospitalDashboard = () => {
  const navigate = useNavigate();

  const handleRequestBlood = () => navigate('/submit/request');
  const handleSearchDonors = () => navigate('/search/donors');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Hospital Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Request Blood */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Request Blood</h2>
              <p className="mb-4 text-gray-600">
                Submit a blood request and notify matching donors.
              </p>
              <Button onClick={handleRequestBlood} className="w-full">
                Go to Blood Requests
              </Button>
            </CardContent>
          </Card>

          {/* Search Donors */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Search Donors</h2>
              <p className="mb-4 text-gray-600">
                Find registered donors based on blood type and location.
              </p>
              <Button onClick={handleSearchDonors} className="w-full">
                Search Donors
              </Button>
            </CardContent>
          </Card>

          {/* My Blood Requests */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">My Blood Requests</h2>
              <p className="mb-4 text-gray-600">
                View and track all your submitted blood requests.
              </p>
              <Button onClick={() => navigate('/myrequests')} className="w-full">
                View Requests
              </Button>
            </CardContent>
          </Card>

          {/* ✅ Appointments */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Appointments</h2>
              <p className="mb-4 text-gray-600">
                See a list of donors who have booked appointments with your hospital.
              </p>
              <Button onClick={() => navigate('/hospital/appointments')} className="w-full">
                View Appointments
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
