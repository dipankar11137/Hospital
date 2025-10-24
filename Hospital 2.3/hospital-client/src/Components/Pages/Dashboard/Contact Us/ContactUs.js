import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Contacts from './Contacts';

const ContactUs = () => {
  const [contacts, setContact] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/contact')
      .then(res => res.json())
      .then(data => setContact(data));
  }, []);

  const handleDelete = id => {
    const proceed = window.confirm(
      'Are you sure you want to delete this contact?'
    );
    if (proceed) {
      fetch(`http://localhost:5000/contacts/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => {
          setContact(prev => prev.filter(contact => contact._id !== id));
          toast.success('Contact removed successfully');
        });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Manage Contact Messages
      </h1>

      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-500 sticky top-0 z-10">
            <tr className="text-center text-white text-sm font-semibold">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact, index) => (
              <Contacts
                key={contact._id}
                contact={contact}
                index={index + 1}
                handleDelete={handleDelete}
              />
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No contact messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUs;
