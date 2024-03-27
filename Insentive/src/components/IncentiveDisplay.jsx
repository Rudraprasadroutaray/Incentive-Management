import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function IncentiveDisplay() {
  const [user, setUser] = useState(null);
  const [salesTarget, setSalesTarget] = useState('');
  const [percentage, setPercentage] = useState('');
  const [bonus, setBonus] = useState('');
  const [date, setDate] = useState('');
  const [empId, setId] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');
  const [totalSales, setTotalSales] = useState('')
  const [holidayPackage, setHolidayPackage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:3000/getUser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setUser(res.data);
          setId(res.data.userId)
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    } else {
      setError('Authentication token not found');
    }
  }, []);

  const calculateIncentive = () => {
    const sales = parseInt(salesTarget);

    let calculatedPercentage = '';
    let calculatedBonus = '';
    let calculatedHolidayPackage = null;

    if (sales >= 50000) {
      calculatedPercentage = '5%';
      calculatedBonus = '$0';
      calculatedHolidayPackage = true;
    } else if (sales >= 30000) {
      calculatedPercentage = '3.5%';
      calculatedBonus = '$1000';
      calculatedHolidayPackage = false;
    } else if (sales >= 20000) {
      calculatedPercentage = '3%';
      calculatedBonus = '$0';
      calculatedHolidayPackage = false;
    } else if (sales >= 10000) {
      calculatedPercentage = '1.5%';
      calculatedBonus = '$0';
      calculatedHolidayPackage = false;
    } else {
      calculatedPercentage = '0%';
      calculatedBonus = '$0';
      calculatedHolidayPackage = false;
    }

    setPercentage(calculatedPercentage);
    setBonus(calculatedBonus);
    setHolidayPackage(calculatedHolidayPackage);

    const data = {
      salesTarget,
      percentage: calculatedPercentage,
      bonus: calculatedBonus,
      holidayPackage: calculatedHolidayPackage ? 'Eligible' : 'Not Eligible',
      date,
      empId,
      destination,
      duration,
      cost,
      totalSales

    };

    axios.post('http://localhost:3000/incentive', data)
      .then(response => {
        console.log("Data sent successfully");
        setError(null);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="container mx-auto p-6">
      {error && <p className="text-red-500">Error: {error}</p>}

      {user ? (
        <div>
          <p className="text-xl font-semibold mb-4">User Details:</p>
          <p><span className="font-semibold">empId:</span> {user.userId}</p>
          <p><span className="font-semibold">Account holder Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <div className="mt-8">
        <label className="block font-semibold mb-2">Emp Id</label>
        <input
          readOnly
          type="text"
          placeholder="Enter Emp Id"
          value={empId}
          onChange={(e) => setId(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
        />

        <label className="block font-semibold mb-2">Sales Target:</label>
        <input
          type="text"
          placeholder="Enter sales target"
          value={salesTarget}
          onChange={(e) => setSalesTarget(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
        />

        <label className="block font-semibold mb-2">Percentage:</label>
        <input
          type="text"
          placeholder="Percentage"
          value={percentage}
          readOnly
          className="border border-gray-400 rounded-md px-4 py-2 mb-4 bg-gray-100 text-gray-800"
        />

        <label className="block font-semibold mb-2">Bonus:</label>
        <input
          type="text"
          placeholder="Bonus"
          value={bonus}
          readOnly
          className="border border-gray-400 rounded-md px-4 py-2 mb-4 bg-gray-100 text-gray-800"
        />

        <label htmlFor="date" className="block font-semibold mb-2">Date:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
        />

        <button onClick={calculateIncentive} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Calculate Incentive
        </button>

        {holidayPackage !== null && (
          <div className="mt-4">
            <label className="block font-semibold mb-2">Holiday Package:</label>
            <input
              type="text"
              value={holidayPackage ? 'Eligible' : 'Not Eligible'}
              readOnly
              className="border border-gray-400 rounded-md px-4 py-2 mb-4 bg-gray-100 text-gray-800"
            />
          </div>
        )}
      </div>
      <Link to={`/userView/${empId}`}>View Details</Link>
    </div>
  );
}

export default IncentiveDisplay;
