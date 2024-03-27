import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HolidayPackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState({
    destination: '',
    duration: '',
    cost: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/holidayPackages/${id}`);
        setPackageData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/holidayPackages/${id}`, {
        destination: packageData.destination,
        duration: packageData.duration,
        cost: packageData.cost
      });
      toast.success('Holiday package updated successfully');
    } catch (error) {
      console.error('Error updating holiday package:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
      <div className="bg-gray-400 shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Update Holiday Package</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination:</label>
            <input
              type="text"
              name="destination"
              value={packageData.destination}
              onChange={handleChange}
              id="destination"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration:</label>
            <input
              type="text"
              name="duration"
              value={packageData.duration}
              onChange={handleChange}
              id="duration"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost:</label>
            <input
              type="text"
              name="cost"
              value={packageData.cost}
              onChange={handleChange}
              id="cost"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Package
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HolidayPackage;
