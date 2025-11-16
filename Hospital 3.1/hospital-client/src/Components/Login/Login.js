import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Share/Loading';

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (user || gUser) {
    navigate(from, { replace: true });
  }

  if (loading || gLoading) {
    return <Loading />;
  }

  const onSubmit = async data => {
    await signInWithEmailAndPassword(data.email, data.password);
  };

  const signInError = error || gError;

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("https://cdn.wallpapersafari.com/31/82/cyBn5z.jpg")`,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md px-6 py-10 bg-white/0  backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-5">
          <img
            className="w-20 h-20 rounded-full"
            src="https://cdn.pixabay.com/animation/2022/12/20/03/45/03-45-09-865_512.gif"
            alt="Login"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6">
          Welcome Back
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-indigo-500" />
            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full pl-10 bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Provide a valid Email',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-indigo-500" />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full pl-10 bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {signInError && (
            <p className="text-red-600 text-sm text-center bg-red-50 rounded-md py-1">
              {signInError.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            Login
          </button>
        </form>

    
        {/* <div className="divider my-5 text-gray-500">OR</div>

   
        <button
          onClick={() => signInWithGoogle()}
          className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-all duration-200"
        >
          <FcGoogle size={22} /> <span>Continue with Google</span>
        </button> */}

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{' '}
          <Link
            to="/createAccount"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>

      {/* Responsive footer spacing */}
      <div className="mt-10 text-white text-xs text-center z-10">
        © {new Date().getFullYear()} Hospital Management System
      </div>
    </div>
  );
};

export default Login;

// import React from "react";
// import {
//   useSignInWithEmailAndPassword,
//   useSignInWithGoogle,
// } from "react-firebase-hooks/auth";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import auth from "../../firebase.init";
// // import axios from "axios";
// import lock from '../../Images/Login/lock.jpg';
// import Loading from "../Share/Loading";

// const Login = () => {
//   const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();
//   const [signInWithEmailAndPassword, user, loading, error] =
//     useSignInWithEmailAndPassword(auth);

//   let signInError;
//   const navigate = useNavigate();
//   const location = useLocation();

//   let from = location.state?.from?.pathname || "/";

//   if (user || gUser) {
//     navigate(from, { replace: true });
//   }

//   if (loading || gLoading) {
//     return <Loading></Loading>;
//   }

//   if (error || gError) {
//     signInError = (
//       <p className="text-red-500 bg-white mb-2 rounded-lg p-1 pl-2">
//         <small>{error?.message || gError?.message}</small>
//       </p>
//     );
//   }
//   const onSubmit = async (data) => {
//     const email = data.email;
//     await signInWithEmailAndPassword(data.email, data.password);
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url("https://cdn.wallpapersafari.com/31/82/cyBn5z.jpg")`,
//         backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         width: '100%',
//         height: '100vp',
//       }}
//       className="flex justify-center pb-10 bg-slate-700"
//     >
//       <div className="mt-20  ">
//         <div
//           style={{
//             backgroundImage: `url(${lock})`,
//             backgroundPosition: 'center',
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             width: '100%',
//             boxShadow: '2px ',
//             zIndex: '2',
//           }}
//           className="card w-72 shadow-2xl bg-violet-50"
//         >
//           <div className="card-body text-white">
//             <div className="flex justify-center ">
//               <img
//                 className="w-16 h-16 "
//                 src="https://cdn.pixabay.com/animation/2022/12/20/03/45/03-45-09-865_512.gif"
//                 alt=""
//               />
//             </div>
//             <h2 className="text-center text-3xl font-bold mt-2">Login</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="form-control w-full text-black ">
//                 <label className="label">
//                   <span className="label-text text-white">Email</span>
//                 </label>
//                 <input
//                   style={{ width: '350px' }}
//                   type="email"
//                   placeholder="Your Email"
//                   className="input input-bordered bg-white  w-80 "
//                   {...register('email', {
//                     required: {
//                       value: true,
//                       message: 'Email is Required',
//                     },
//                     pattern: {
//                       value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
//                       message: 'Provide a valid Email',
//                     },
//                   })}
//                 />
//                 <label className="label">
//                   {errors.email?.type === 'required' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.email.message}
//                     </span>
//                   )}
//                   {errors.email?.type === 'pattern' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.email.message}
//                     </span>
//                   )}
//                 </label>
//               </div>
//               <div className="form-control w-full ">
//                 <label className="label">
//                   <span className="label-text text-white">Password</span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="input input-bordered text-black font-bold bg-white w-full "
//                   {...register('password', {
//                     required: {
//                       value: true,
//                       message: 'Password is Required',
//                     },
//                     minLength: {
//                       value: 6,
//                       message: 'Must be 6 characters or longer',
//                     },
//                   })}
//                 />
//                 <label className="label">
//                   {errors.password?.type === 'required' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.password.message}
//                     </span>
//                   )}
//                   {errors.password?.type === 'minLength' && (
//                     <span className="label-text-alt text-red-500">
//                       {errors.password.message}
//                     </span>
//                   )}
//                 </label>
//               </div>

//               {signInError}
//               <input
//                 className="btn btn-primary w-full text-white"
//                 type="submit"
//                 value="Login"
//               />
//             </form>
//             <p></p>
//             <div className="divider">OR</div>

//             <Link
//               to="/createAccount"
//               className="btn btn-outline  font-extrabold bg-indigo-400 hover:bg-indigo-800"
//             >
//               Create New Account
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
