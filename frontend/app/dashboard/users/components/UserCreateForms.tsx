"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Define the User type
interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserCreateForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create new user
      await axios.post('/api/users', { name, email, password, role });
      toast.success('User created successfully');
      router.push('/dashboard/users'); // Redirect to user list after creation
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="ml-2 text-gray-700">Show password</label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default UserCreateForm;
