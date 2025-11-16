import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ManageContact from './ManageContact';

const ManageContacts = () => {
  const [contacts, setContact] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/contact')
      .then(res => res.json())
      .then(data => setContact(data));
  }, [contacts]);

  const handleDelete = id => {
    const proceed = window.confirm('Are You Sure ?');
    if (proceed) {
      const url = `http://localhost:5000/contacts/${id}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          const remaining = contacts.filter(contact => contact._id !== id);
          setContact(remaining);
          toast.success('Successfully Remove ');
        });
    }
  };
  return (
    <div className="px-1 h-screen">
      <h1 className="text-3xl font-semibold text-white text-center py-5 pr-20">
        Manage All Contact
      </h1>
      <div className="overflow-x-auto">
        <table className="table  w-full text-white">
          <thead>
            <tr className="text-3xl bg-slate-900 text-center">
              <th className="bg-slate-700 text-xl"></th>
              <th className="bg-slate-700 text-xl"> Name</th>
              <th className="bg-slate-700 text-xl">Email</th>
              <th className="bg-slate-700 text-xl">Phone</th>

              <th className="bg-slate-700 text-xl w-[600px]">Description</th>
              <th className="bg-slate-700 text-xl">Remove</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <ManageContact
                key={contact._id}
                contact={contact}
                index={index + 1}
                handleDelete={handleDelete}
              ></ManageContact>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContacts;
