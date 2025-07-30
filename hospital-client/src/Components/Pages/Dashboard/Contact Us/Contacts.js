
const Contacts = ({ contact, index, handleDelete }) => {
  const { _id, name, email, description, phone } = contact;
  return (
    <tr className="text-center text-gray-700 hover:bg-gray-100 transition duration-300">
      <th className="bg-slate-200 py-3">{index}</th>
      <td className="bg-slate-200 border-r-2 py-3">{name}</td>
      <td className="bg-slate-200 border-r-2 py-3">{email}</td>
      <td className="bg-slate-200 border-r-2 py-3">{phone}</td>
      <td className="bg-slate-200 border-r-2 py-3">{description}</td>
      <td className="bg-slate-200 border-r-2 py-3">
        <button
          onClick={() => handleDelete(_id)}
          className="bg-orange-600 btn-secondary btn-xs px-3 py-1 rounded-md uppercase text-white font-semibold hover:bg-orange-500"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default Contacts;

