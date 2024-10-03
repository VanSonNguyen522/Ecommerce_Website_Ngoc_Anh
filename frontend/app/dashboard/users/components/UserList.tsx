"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from './ButtonUserList'; // Import the Button component

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // For bulk delete
  const [searchEmail, setSearchEmail] = useState(''); // For search by email

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get<User[]>('/api/users');
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const fetchSearchUsers = async (email: string) => {
    try {
      const { data } = await axios.get<User[]>(`/api/users?email=${email}`);
      setUsers(data);
      setCurrentPage(1); // Reset to page 1 when searching
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  // Handle checkbox for selecting users
  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      toast.error('No users selected for deletion.');
      return;
    }

    try {
      const deletePromises = selectedUsers.map((userId) =>
        axios.delete(`/api/users?id=${userId}`)
      );

      // Execute all delete promises
      await Promise.all(deletePromises);
      toast.success('Selected users deleted successfully.');

      fetchUsers(); // Refresh users after deletion
      setSelectedUsers([]); // Clear selected users
    } catch (error) {
      toast.error('Error deleting users');
      console.error('Delete error:', error);
    }
  };

  // Handle search by email
  const handleSearchByEmail = async () => {
    await fetchSearchUsers(searchEmail);
  };

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="container mx-auto p-5 text-left">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {/* Refresh and Delete Selected Buttons */}
      <div className="flex justify-between mb-4">
        <Button onClick={fetchUsers}>
          Refresh
        </Button>
        <Button
          onClick={handleBulkDelete}
          disabled={selectedUsers.length === 0} // Disable if no user selected
          className="bg-red-500 hover:bg-red-700" // Custom class for delete button
        >
          Delete Selected
        </Button>
      </div>

      {/* Search by Email */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <Button onClick={handleSearchByEmail}>
          Search by Email
        </Button>
      </div>

      {/* User Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">Select</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td className="px-4 py-2">
                <input 
                  type="checkbox" 
                  checked={selectedUsers.includes(user.id)} // Check if user is selected
                  onChange={() => handleCheckboxChange(user.id)} // Call the handler on change
                />
              </td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded mx-2"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-300 rounded mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
