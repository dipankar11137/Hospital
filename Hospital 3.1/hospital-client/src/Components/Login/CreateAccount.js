import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
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

  const from = location.state?.from?.pathname || '/';

  if (gUser || user) {
    navigate(from, { replace: true });
  }

  const createDBUser = async data => {
    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      img: data.photo || '',
    };
    await fetch(`http://localhost:5000/create-user/${data?.email}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updateData),
    });
  };

  const onSubmit = async data => {
    try {
      await createUserWithEmailAndPassword(data.email, data.password);
      await updateProfile({ displayName: data.name });
      await createDBUser(data);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  const signInError = gError || error || updateError;
  const isLoading = gLoading || loading || updating;

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://cdn.wallpapersafari.com/31/82/cyBn5z.jpg")',
      }}
    >
      <div className="flex flex-1 justify-center items-center px-4 py-10 pt-28 bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-indigo-500" />
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full pl-10 bg-white border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                {...register('name', {
                  required: 'Name is required',
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-indigo-500" />
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full pl-10 bg-white border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: 'Provide a valid email',
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
                className="input input-bordered w-full pl-10 bg-white border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-200"
            >
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          {signInError && (
            <p className="text-red-500 text-center mt-3 text-sm">
              {signInError.message}
            </p>
          )}

          {/* <div className="divider my-5">OR</div> */}

          {/* <button
            onClick={() => signInWithGoogle()}
            className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-all duration-200"
          >
            <FcGoogle size={22} /> <span>Continue with Google</span>
          </button> */}

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateAccount;

// import {
//   useCreateUserWithEmailAndPassword,
//   useSignInWithGoogle,
//   useUpdateProfile,
// } from 'react-firebase-hooks/auth';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import auth from '../../firebase.init';
// import Footer from '../Share/Footer';

// const CreateAccount = () => {
//   const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const [createUserWithEmailAndPassword, user, loading, error] =
//     useCreateUserWithEmailAndPassword(auth);

//   const [updateProfile, updating, updateError] = useUpdateProfile(auth);
//   const navigate = useNavigate();
//   const location = useLocation();

//   let from = location.state?.from?.pathname || '/';

//   let signInError;
//   if (gUser) {
//     navigate('/');
//   }

//   const createDBUser = data => {
//     // console.log(data);
//     const updateData = {
//       name: data.name,
//       email: data.email,
//       phone: data.phone,
//       img: data.photo,
//       shipCode: data.shipCode,
//     };
//     fetch(`http://localhost:5000/create-user/${data?.email}`, {
//       method: 'PUT',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(updateData),
//     })
//       .then(res => res.json())
//       .then(data => {});
//   };

//   const onSubmit = data => {
//     createUserWithEmailAndPassword(data.email, data.password);
//     updateProfile({ displayName: data.name });
//     createDBUser(data);
//     toast.success('Updated profile');
//     navigate('/');
//   };
//   return (
//     <div
//       style={{
//         backgroundImage: `url("https://cdn.wallpapersafari.com/31/82/cyBn5z.jpg")`,
//         backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         width: '100%',
//         // height: '900px',
//       }}
//       className="  bg-slate-700"
//     >
//       <div className="flex justify-center   pt-20 pb-5">
//         <div className="card w-96 shadow-2xl bg-violet-50">
//           <div className="card-body text-indigo-900">
//             <h2 className="text-center text-2xl font-bold mb-0">SignUp</h2>

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="flex gap-x-4 text-black">
//                 <div>
//                   <div className="form-control w-full   ">
//                     <label className="label">
//                       <span className="label-text text-black">Name</span>
//                     </label>
//                     <input
//                       style={{ width: '300px' }}
//                       type="text"
//                       placeholder="Your name"
//                       className="input input-bordered bg-white w-full   "
//                       {...register('name', {
//                         required: {
//                           value: true,
//                           message: 'Name is Required',
//                         },
//                       })}
//                     />
//                     <label className="label">
//                       {errors.name?.type === 'required' && (
//                         <span className="label-text-alt text-red-500">
//                           {errors.name.message}
//                         </span>
//                       )}
//                     </label>
//                   </div>
//                   {/* email */}
//                   <div className="form-control w-full   ">
//                     <label className="label">
//                       <span className="label-text text-black -mt-5">Email</span>
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="Your Email"
//                       className="input input-bordered bg-white w-full   "
//                       {...register('email', {
//                         required: {
//                           value: true,
//                           message: 'Email is Required',
//                         },
//                         pattern: {
//                           value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
//                           message: 'Provide a valid Email',
//                         },
//                       })}
//                     />
//                     <label className="label">
//                       {errors.email?.type === 'required' && (
//                         <span className="label-text-alt text-red-500">
//                           {errors.email.message}
//                         </span>
//                       )}
//                       {errors.email?.type === 'pattern' && (
//                         <span className="label-text-alt text-red-500">
//                           {errors.email.message}
//                         </span>
//                       )}
//                     </label>
//                   </div>
//                   {/* Password */}
//                   <div className="form-control w-full  ">
//                     <label className="label">
//                       <span className="label-text text-black -mt-3">
//                         Password
//                       </span>
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       className="input input-bordered text-black font-bold bg-white w-full   "
//                       {...register('password', {
//                         required: {
//                           value: true,
//                           message: 'Password is Required',
//                         },
//                         minLength: {
//                           value: 6,
//                           message: 'Must be 6 characters or longer',
//                         },
//                       })}
//                     />
//                     <label className="label">
//                       {errors.password?.type === 'required' && (
//                         <span className="label-text-alt text-red-500">
//                           {errors.password.message}
//                         </span>
//                       )}
//                       {errors.password?.type === 'minLength' && (
//                         <span className="label-text-alt text-red-500">
//                           {errors.password.message}
//                         </span>
//                       )}
//                     </label>
//                   </div>
//                 </div>
//                 <div></div>
//               </div>
//               {signInError}
//               <input
//                 className="btn w-full text-white mt-0"
//                 type="submit"
//                 value="Sign Up"
//               />
//             </form>

//             <div className="divider ">OR</div>
//             <p className="ml-2 -mt-3">Already Have An Account</p>

//             <Link
//               to="/login"
//               className="btn btn-primary  text-white  font-extrabold "
//             >
//               Please Login
//             </Link>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CreateAccount;
