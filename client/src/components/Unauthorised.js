// components/Unauthorised.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorised = () => (
  <div className="h-screen flex flex-col justify-center items-center text-center px-4">
    <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorised</h1>
    <p className="mb-6 text-lg">You don’t have access to this page.</p>
    <Link to="/" className="text-blue-600 underline">Go Back Home</Link>
  </div>
);

export default Unauthorised;
