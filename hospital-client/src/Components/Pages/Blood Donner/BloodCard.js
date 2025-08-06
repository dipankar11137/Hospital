const BloodCard = ({ group, available, regular, contact, onClick }) => {
  const defaultStyle = {
    label: group?.label || 'Unknown',
    bg: group?.bg || 'bg-gray-500',
  };

  return (
    <div
      onClick={onClick}
      className={`text-center text-xl p-10 text-white rounded-xl cursor-pointer hover:scale-105 duration-200 ${defaultStyle.bg}`}
    >
      <h1 className="text-3xl font-semibold">{defaultStyle.label}</h1>
      <h1>Available: {available}</h1>
      <h1>Regular Donor: {regular}</h1>
      <h1>{contact}</h1>
      <button
        onClick={e => {
          e.stopPropagation();
          window.location.href = `tel:${contact}`;
        }}
        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
      >
        Call Now
      </button>
    </div>
  );
};
export default BloodCard;