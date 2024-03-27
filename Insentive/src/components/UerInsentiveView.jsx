import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserInsentiveView() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/userDetails/${id}`);
        setUserDetails(response.data);
        setLoading(false);
        calculateTotalSales(response.data);
        calculateSuggestion(response.data.salesTarget);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const calculateTotalSales = (userData) => {
    let total = 0;
    userData.forEach(user => {
      total += parseInt(user.salesTarget);
    });
    setTotalSales(total);
    // console.log(total);
  };

  useEffect(() => {
    // console.log(totalSales);
    const updateTotalSales = async () => {
      try {
        await axios.put(`http://localhost:3000/updateTotalSales/${id}`, { totalSales });
        console.log(totalSales);
      } catch (error) {
        console.error('Error updating total sales:', error);
      }
    };

    updateTotalSales(); // Update total sales whenever it changes
  }, [totalSales, id]);



  const calculateSuggestion = (salesTarget) => {
    const sales = parseInt(salesTarget);
    let calculatedSuggestion = '';

    if (sales < 10000) {
      calculatedSuggestion = 'You are below the minimum sales target. Try to increase your sales to qualify for incentives.';
    } else if (sales < 20000) {
      calculatedSuggestion = 'You have achieved less than 20,000 in sales. Aim for higher sales to increase your incentives.';
    } else if (sales < 30000) {
      calculatedSuggestion = 'You have achieved less than 30,000 in sales. Aim for higher sales to qualify for additional incentives.';
    } else if (sales < 50000) {
      calculatedSuggestion = 'You are close to reaching the maximum incentive tier. Keep up the good work to qualify for the holiday package.';
    } else {
      calculatedSuggestion = 'Congratulations! You have achieved the highest sales tier and are eligible for the holiday package.';
    }

    setSuggestion(calculatedSuggestion);
  };

  const handleViewClick = () => {
    setShowDetails(prevState => !prevState);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-800 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      {userDetails.map((user, index) => (
        <div key={index} className="border border-gray-300 rounded-md p-4 mb-4">
          <p><span className="font-semibold">EmpId:</span> {user.empId}</p>
          <p><span className="font-semibold">Sales:</span> {user.salesTarget}</p>
          <p><span className="font-semibold">Date:</span> {user.date}</p>
          <p><span className="font-semibold">Bonus:</span> {user.bonus}</p>
        </div>
      ))}
      <p className="mt-4">Total Sales: {totalSales}</p>
      <p className="mt-4">Suggestion: {suggestion}</p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewClick}>
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>
      {showDetails && (
        <div className="border border-gray-300 rounded-md p-4 mt-4">
          <p><span className="font-semibold">Destination:</span> {userDetails[0].destination}</p>
          <p><span className="font-semibold">Duration:</span> {userDetails[0].duration}</p>
        </div>
      )}
    </div>
  );
}

export default UserInsentiveView;
 