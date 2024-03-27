import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function EmployeeForm() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  
  const navigate=useNavigate()
  useEffect(() => {
    // Retrieve authentication token from local storage or session storage
    const token = localStorage.getItem('token');

    // Check if token is available
    if (token) {
      // Make GET request to fetch user details
      axios.get('http://localhost:3000/getAdmin', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    } else {
      setError('Authentication token not found');
    }

    axios.get('http://localhost:3000/get')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error");
      });
  }, []);

  // Function to check eligibility for holiday package
  const isEligibleForHolidayPackage = (salesTarget) => {
    if (salesTarget >= 50000) {
      return true; // Eligible for holiday package
    } else {
      return false; // Not eligible for holiday package
    }
  };



  const Update=(id)=>{
    // e.preventDefault();
    console.log(id);
    navigate(`/update/${id}`);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">Insentive</Link>
          {user && (
            <div className="flex items-center text-white">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <div>
                <p>Admin : {user.name}</p>
                <p>Email : {user.email}</p>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto flex-grow py-8">
        {error ? (
          <div className="text-red-500">
            <p>{error}</p>
            <Link to="/login" className="text-blue-500">Go to login page</Link>
          </div>
        ) : (
          <div>
            {user && (
              <div>
                <p className="text-xl font-semibold mb-4">User Insentive Details:</p>
              </div>
            )}
          </div>
        )}

        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Emp Id</th>
              <th className="px-4 py-2">Sales Target</th>
              <th className="px-4 py-2">Percentage</th>
              <th className="px-4 py-2">Bonus</th>
              <th className="px-4 py-2">Sales Date</th>
              <th className="px-4 py-2">Holiday Package</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((details, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{details.empId}</td>
                <td className="border px-4 py-2">{details.salesTarget}</td>
                <td className="border px-4 py-2">{details.percentage}</td>
                <td className="border px-4 py-2">{details.bonus}</td>
                <td className="border px-4 py-2">{details.date}</td>
                <td className="border px-4 py-2">{details.holidayPackage}</td>
                <td className="border px-4 py-2">
                  <button onClick={()=>Update(details._id)}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isEligibleForHolidayPackage(details.salesTarget) ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isEligibleForHolidayPackage(details.salesTarget)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeForm;
