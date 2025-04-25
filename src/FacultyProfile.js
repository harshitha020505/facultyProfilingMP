import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FacultyProfile.css';

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // assume you stored this at login
  const email = localStorage.getItem('email'); 

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    // fetch must return a promise — chain then/catch here
    axios
      .get(`http://localhost:5000/api/faculty/profile/${encodeURIComponent(email)}`)
      .then(response => {
        setFaculty(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching faculty details:', error);
        setLoading(false);
      });
  }, [email, navigate]);

  if (loading) return <div>Loading profile…</div>;
  if (!faculty) return <div className="error">Failed to load profile.</div>;

  return (
    <div className="profile-card">
      <h2>Faculty Profile</h2>
      <p><strong>Name:</strong> {faculty.name}</p>
      <p><strong>Email:</strong> {faculty.email}</p>
      <p><strong>Email:</strong> {faculty.gender}</p>
      <p><strong>Email:</strong> {faculty.phoneNumber}</p>
      <p><strong>Email:</strong> {faculty.address}</p>
      <p><strong>Email:</strong> {faculty.dateOfBirth}</p>
      <p><strong>Department:</strong> {faculty.department}</p>
      {/* render whatever other fields you have on faculty */}
      <button onClick={() => navigate('/EditProfile', { state: { faculty } })}>
        Edit Profile
      </button>
    </div>
  );
};

export default FacultyProfile;
