'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useApi } from '../hooks/useApi';

const UserProfile = () => {
  const { data: session, status } = useSession();
  const { get, loading, error } = useApi();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Only fetch user data if we have an accessToken
    if (session?.accessToken) {
      const fetchUserData = async () => {
        try {
          // The accessToken will be automatically added by the fetchClient
          const data = await get('/user/profile');
          setUserData(data);
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      };

      fetchUserData();
    }
  }, [session, get]);

  if (status === 'loading') {
    return <div>Loading session...</div>;
  }

  if (!session?.accessToken) {
    return <div>Please log in to view your profile</div>;
  }

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      
      {userData ? (
        <div>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Access Token:</strong> {session.accessToken.substring(0, 10)}...</p>
          {/* Add more user data fields as needed */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserProfile; 