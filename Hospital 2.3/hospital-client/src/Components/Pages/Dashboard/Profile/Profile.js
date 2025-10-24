import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [authUser] = useAuthState(auth);
  const [dbUser, setDbUser] = useState([]);
  console.log(authUser?.email);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${authUser?.email}`)
      .then(res => res.json())
      .then(data => setDbUser(data));
  }, [dbUser, authUser]);

  const handleProfileUpdate = e => {
    e.preventDefault();

    const name = e.target.name.value || dbUser[0].name;

    const phone = e.target.phone.value || dbUser[0].phone;
    const country = e.target.country.value || dbUser[0].country;

    const bio = e.target.bio.value || dbUser[0].bio;
    const photo = e.target.photo.value || dbUser[0].photo;
    const email = authUser?.email;

    const updatedProfile = {
      name,
      phone,
      country,
      bio,
      photo,
      email,
    };

    fetch(`http://localhost:5000/create-user/${email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Profile Successfully Updated');
        e.target.reset();
        setEdit(false);
      });
  };
  const profilePic =
    'https://benfranklinsworld.com/wp-content/uploads/2021/08/309-Reid-Feature.jpg';
  return (
    <div className="w-full mt-28">
      <div className="flex justify-center">
        {' '}
        <div
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1608311820794-24a88c3835da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZ1bWV8ZW58MHx8MHx8&w=1000&q=80")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className="indicator  rounded-lg mt-10 m-4 w-5/12 h-fit"
        >
          <div style={{ marginTop: '-20px' }} className="-mt-6 ">
            <img
              className=" w-72 h-72 indicator-item indicator-center rounded-full"
              src={dbUser[0]?.img || profilePic}
              alt=""
            />
          </div>
          <div className="mt-32 pl-4 w-full ">
            <div className="text-left py-8">
              <div className="flex items-baseline justify-between">
                <p className="font-bold w-1/3">Ship Name</p>
                <span className="w-2/3">: {dbUser[0]?.name}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <p className="font-bold w-1/3">Email</p>
                <span className="w-2/3">: {dbUser[0]?.email}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <p className="font-bold w-1/3">Country</p>
                <span className="w-2/3">: {dbUser[0]?.country}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <p className="font-bold w-1/3">Phone</p>
                <span className="w-2/3">: {dbUser[0]?.phone}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <p className="font-bold w-1/3">Ship Code</p>
                <span className="w-2/3">: {dbUser[0]?.shipCode}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <p className="font-bold w-1/3">Bio</p>
                <span className="w-2/3">: {dbUser[0]?.bio}</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setEdit(true)}
                className="btn bg-indigo-400 hover:bg-indigo-800 text-black hover:text-white font-extrabold text-4xl border-0 w-2/3 my-6 "
              >
                <FaEdit />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* edit start */}
      {edit && (
        <div className="flex justify-center">
          <div
            style={{
              backgroundImage: `url("https://t3.ftcdn.net/jpg/02/97/23/40/360_F_297234032_RPeeRD0tBpUThVgXYcJ3tACVAqJfXD9p.jpg")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="w-6/12 bg-white rounded-lg m-4 p-4 h-fit "
          >
            <div className="flex justify-center">
              {' '}
              <p className="text-2xl font-bold text-cyan-600 border-b-2 inline p-1 ">
                Update Your Profile
              </p>
            </div>

            <form onSubmit={handleProfileUpdate}>
              <div className="mt-8 text-black">
                <div className="flex gap-4 justify-between">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-white">Ship Name</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Type here"
                      className="input input-sm input-bordered w-full max-w-xs"
                    />
                  </div>
                </div>
                {/* contact */}
                <div className="flex gap-4 justify-between mt-4">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-white">Contact</span>
                    </label>
                    <input
                      name="phone"
                      type="text"
                      placeholder="Type here Phone Number"
                      className="input input-sm input-bordered w-full max-w-xs"
                    />
                  </div>
                </div>
                {/* country */}
                <div className="flex gap-4 justify-between mt-4">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-white">Country</span>
                    </label>
                    <input
                      name="country"
                      type="text"
                      placeholder="Type here Your country name"
                      className="input input-sm input-bordered w-full max-w-xs"
                    />
                  </div>
                </div>
                {/* bio */}
                <div className="flex gap-4 justify-between mt-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-white">Bio</span>
                    </label>
                    <textarea
                      name="bio"
                      type="text"
                      placeholder="Type here"
                      className="textarea textarea-bordered w-full"
                    />
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-white">
                      Profile Picture Link
                    </span>
                  </label>
                  <input
                    name="photo"
                    type="text"
                    placeholder="Type here"
                    className="input input-sm input-bordered w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn bg-indigo-400 hover:bg-indigo-800 text-black font-extrabold border-0 my-4"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
