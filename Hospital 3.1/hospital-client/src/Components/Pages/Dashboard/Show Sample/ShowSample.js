import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ShowSample = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // Fetch orders
  // ======================
  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/sampleOrders');
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch {
      toast.error('Failed to load sample orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ======================
  // Update Status
  // ======================
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/sampleOrders/status/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        },
      );

      if (res.ok) {
        toast.success(`Status updated to "${status}"`);
        fetchOrders();
      } else {
        toast.error('Status update failed');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  // ======================
  // Delete Order
  // ======================
  const handleDelete = async id => {
    if (!window.confirm('Delete this sample order?')) return;

    try {
      const res = await fetch(`http://localhost:5000/sampleOrders/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Order deleted');
        fetchOrders();
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-semibold text-lg">
        Loading sample orders...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Sample Collection Management
      </h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
        <table className="table w-full text-center">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Samples</th>
              <th>Total (৳)</th>
              <th>Pending</th>
              <th>Collection Done</th>
              <th>Payment Done</th>
              <th>Report Done</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td className="font-semibold">{order.userName}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>

                <td className="text-left">
                  {order.samples.map((s, i) => (
                    <div key={i} className="text-sm">
                      • {s.sampleName} — ৳{s.price}
                    </div>
                  ))}
                </td>

                <td className="font-bold text-green-700">
                  ৳{order.totalPrice}
                </td>

                {/* Pending */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Pending'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    Pending
                  </span>
                </td>

                {/* Collection Done */}
                <td>
                  <button
                    disabled={order.status !== 'Pending'}
                    onClick={() => updateStatus(order._id, 'Collection Done')}
                    className={`btn btn-xs ${
                      order.status === 'Pending'
                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                        : 'btn-disabled'
                    }`}
                  >
                    Done
                  </button>
                </td>

                {/* Payment Done */}
                <td>
                  <button
                    disabled={order.status !== 'Collection Done'}
                    onClick={() => updateStatus(order._id, 'Payment Done')}
                    className={`btn btn-xs ${
                      order.status === 'Collection Done'
                        ? 'bg-purple-600 hover:bg-purple-500 text-white'
                        : 'btn-disabled'
                    }`}
                  >
                    Paid
                  </button>
                </td>

                {/* Report Done */}
                <td>
                  <button
                    disabled={order.status !== 'Payment Done'}
                    onClick={() => updateStatus(order._id, 'Report Done')}
                    className={`btn btn-xs ${
                      order.status === 'Payment Done'
                        ? 'bg-green-600 hover:bg-green-500 text-white'
                        : 'btn-disabled'
                    }`}
                  >
                    Uploaded
                  </button>
                </td>

                {/* Delete */}
                <td>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="btn btn-xs bg-red-600 hover:bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="11" className="py-10 text-gray-500">
                  No sample orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowSample;
