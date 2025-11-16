import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';

const User = ({ user, index, handleAdmin }) => {
  const [users] = useAuthState(auth);

  const profile =
    'https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png';
  return (
    <div className="shadow-lg p-4 rounded-lg">
      <div className="flex gap-x-2 text-start font-normal items-end">
        <img className="w-28 h-28" src={profile} alt="" />

        <div>
          <h1 className="text-xl font-semibold">{user?.name}</h1>
          <h1>{user?.email}</h1>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <div>
          {user.admin ? (
            <button
              disabled
              onClick={() => handleAdmin(user._id, true)}
              className="btn btn-sm btn-primary "
            >
              Add Admin
            </button>
          ) : (
            <button
              disabled={user?.email === users?.email}
              onClick={() => handleAdmin(user._id, true)}
              className="text-[10px] btn btn-sm text-white bg-orange-700 font-normal border-yellow-200"
            >
              Add Admin
            </button>
          )}
        </div>
        <div>
          {user.admin ? (
            <button
              disabled={user?.email === users?.email}
              onClick={() => handleAdmin(user._id, false)}
              className="btn btn-sm btn-primary text-white"
            >
              Remove Admin
            </button>
          ) : (
            <button
              disabled
              onClick={() => handleAdmin(user._id, false)}
              className="btn btn-sm btn-primary text-white"
            >
              Remove Admin
            </button>
          )}
        </div>
      </div>
    </div>
    // <tr>
    //   <th>{index}</th>
    //   <td className="flex gap-x-2 text-start font-normal ">
    //     <img className="w-28 h-28" src={profile} alt="" />
    //     <div>
    //       <h1>{user?.name}</h1>
    //       <h1>{user?.email}</h1>
    //     </div>
    //   </td>
    //   {/* <td>{user?.name}</td>
    //   <td>{user?.email}</td> */}
    //   <td className="flex justify-center">
    //     {user.admin ? (
    //       <button
    //         disabled
    //         onClick={() => handleAdmin(user._id, true)}
    //         className="btn btn-sm btn-primary "
    //       >
    //         Add Admin
    //       </button>
    //     ) : (
    //       <h6
    //         onClick={() => handleAdmin(user._id, true)}
    //         className="text-[10px] btn btn-sm text-white bg-orange-700 font-normal border-yellow-200"
    //       >
    //         Add Admin
    //       </h6>
    //     )}
    //   </td>
    //   <td>
    //     {user.admin ? (
    //       <button
    //         onClick={() => handleAdmin(user._id, false)}
    //         className="btn btn-sm btn-primary text-white"
    //       >
    //         Remove Admin
    //       </button>
    //     ) : (
    //       <button
    //         disabled
    //         onClick={() => handleAdmin(user._id, false)}
    //         className="btn btn-sm btn-primary text-white"
    //       >
    //         Remove Admin
    //       </button>
    //     )}
    //   </td>
    // </tr>
  );
};

export default User;
