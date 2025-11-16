import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import User from './User';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // ✅ Load users from server
  const loadUsers = () => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  };

  // ✅ Initial load
  useEffect(() => {
    loadUsers();
  }, []);

  // ✅ Handle admin toggle
  const handleAdmin = (id, admin) => {
    const updateAdmin = { admin: admin };
    fetch(`http://localhost:5000/admin/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateAdmin),
    })
      .then(res => res.json())
      .then(() => {
        toast.success(
          `User ${admin ? 'added' : 'removed'} as admin successfully!`
        );
        loadUsers(); // ✅ Reload user list after update
      });
  };

  const handleSearch = () => {
    const filtered = users.filter(user =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredUsers([]);
  };

  // ✅ Choose which list to display
  const displayUsers = filteredUsers.length > 0 ? filteredUsers : users;

  return (
    <div className="pt-10 w-full">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by email"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 px-4">
        {displayUsers
          .slice()
          .reverse()
          .map((user, index) => (
            <User
              key={user._id}
              user={user}
              index={index + 1}
              handleAdmin={handleAdmin}
            />
          ))}
      </div>
    </div>
  );
};

export default Users;
