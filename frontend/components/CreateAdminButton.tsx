"use client";

import React from 'react';

const CreateAdminButton = () => {
  const createAdmin = async () => {
    try {
      const response = await fetch('/api/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'adminpassword',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Admin created:', data);
      } else {
        const errorData = await response.json();
        console.error('Error creating admin:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={createAdmin}>
      Create Admin
    </button>
  );
};

export default CreateAdminButton;
