"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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
        <button
          onClick={fetchUsers}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh
        </button>
        <button
          onClick={handleBulkDelete}
          disabled={selectedUsers.length === 0}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Selected
        </button>
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
        <button
          onClick={handleSearchByEmail}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search by Email
        </button>
      </div>

      {/* User Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 text-left border-b">Select</th>
            <th className="py-2 text-left border-b">Name</th>
            <th className="py-2 text-left border-b">Email</th>
            <th className="py-2 text-left border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-left py-4">
                No users found.
              </td>
            </tr>
          ) : (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 text-left border-b">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </td>
                <td className="py-2 text-left border-b">{user.name || 'N/A'}</td>
                <td className="py-2 text-left border-b">{user.email}</td>
                <td className="py-2 text-left border-b">{user.role}</td>
              </tr>
            ))
          )}
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
