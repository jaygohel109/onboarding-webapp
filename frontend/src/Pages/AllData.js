import React, { useEffect, useState } from 'react';
import api from '../api'; // Importing the function from api.js
import '../CSS/AllData.css';  // Import the CSS file

const OnboardingData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOnboardingData = async () => {
      try {
        const response = await api.get("/all-data");
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOnboardingData();
  }, []);

  // Helper function to display cell content
  const displayCellContent = (content) => {
    return content === null || content === undefined ? "N/A" : content;
  };

  if (loading) return <div className="onboarding-loading">Loading...</div>;
  if (error) return <div className="onboarding-error">{error}</div>;

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-page-title">Onboarding Data</h2>
      <div className="onboarding-table-wrapper">
        <table className="onboarding-data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>About Me</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Birthdate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{displayCellContent(item.username)}</td>
                <td>{displayCellContent(item.aboutMe)}</td>
                <td>{displayCellContent(item.street)}</td>
                <td>{displayCellContent(item.city)}</td>
                <td>{displayCellContent(item.state)}</td>
                <td>{displayCellContent(item.zip)}</td>
                <td>{displayCellContent(item.birthdate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnboardingData;
