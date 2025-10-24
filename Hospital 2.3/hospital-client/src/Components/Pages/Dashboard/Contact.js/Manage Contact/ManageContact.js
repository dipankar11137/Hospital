import React from 'react';

const ManageContact = ({ contact, index, handleDelete }) => {
  const { _id, name, email, description, phone } = contact;
  return (
    <tr className="text-center">
      <th className="bg-slate-800">{index}</th>
      <td className="bg-slate-800 border-r-2">{name}</td>
      <td className="bg-slate-800 border-r-2">{email}</td>
      <td className="bg-slate-800 border-r-2">{phone}</td>
      <td className="bg-slate-800 border-r-2">{description}</td>
      <td className="bg-slate-800 border-r-2">
        <button
          onClick={() => handleDelete(_id)}
          className="bg-orange-600 btn-secondary px-3 py-1 rounded-md uppercase text-white font-semibold hover:bg-orange-500"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default ManageContact;
