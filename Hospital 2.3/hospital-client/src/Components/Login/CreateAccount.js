import React from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Footer from '../Share/Footer';

const CreateAccount = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || '/';

  let signInError;
  if (gUser) {
    navigate('/');
  }

  const createDBUser = data => {
    // console.log(data);
    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      img: data.photo,
      shipCode: data.shipCode,
    };
    fetch(`http://localhost:5000/create-user/${data?.email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(res => res.json())
      .then(data => {});
  };

  const onSubmit = data => {
    createUserWithEmailAndPassword(data.email, data.password);
    updateProfile({ displayName: data.name });
    createDBUser(data);
    toast.success('Updated profile');
    navigate('/');
  };
  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.wallpapersafari.com/31/82/cyBn5z.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        // height: '900px',
      }}
      className="  bg-slate-700"
    >
      <div className="flex justify-center   pt-20 pb-5">
        <div className="card w-96 shadow-2xl bg-violet-50">
          <div className="card-body text-indigo-900">
            <h2 className="text-center text-2xl font-bold mb-0">SignUp</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-x-4 text-black">
                <div>
                  <div className="form-control w-full   ">
                    <label className="label">
                      <span className="label-text text-black">Name</span>
                    </label>
                    <input
                      style={{ width: '300px' }}
                      type="text"
                      placeholder="Your name"
                      className="input input-bordered bg-white w-full   "
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Name is Required',
                        },
                      })}
                    />
                    <label className="label">
                      {errors.name?.type === 'required' && (
                        <span className="label-text-alt text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* email */}
                  <div className="form-control w-full   ">
                    <label className="label">
                      <span className="label-text text-black -mt-5">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="input input-bordered bg-white w-full   "
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'Email is Required',
                        },
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: 'Provide a valid Email',
                        },
                      })}
                    />
                    <label className="label">
                      {errors.email?.type === 'required' && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                      {errors.email?.type === 'pattern' && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* Password */}
                  <div className="form-control w-full  ">
                    <label className="label">
                      <span className="label-text text-black -mt-3">
                        Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered text-black font-bold bg-white w-full   "
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'Password is Required',
                        },
                        minLength: {
                          value: 6,
                          message: 'Must be 6 characters or longer',
                        },
                      })}
                    />
                    <label className="label">
                      {errors.password?.type === 'required' && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                      {errors.password?.type === 'minLength' && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div></div>
              </div>
              {signInError}
              <input
                className="btn w-full text-white mt-0"
                type="submit"
                value="Sign Up"
              />
            </form>

            <div className="divider ">OR</div>
            <p className="ml-2 -mt-3">Already Have An Account</p>

            <Link
              to="/login"
              className="btn btn-primary  text-white  font-extrabold "
            >
              Please Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAccount;
