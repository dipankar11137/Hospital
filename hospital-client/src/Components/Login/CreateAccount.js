import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import login from "../../Images/Login/login.jpg";

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

  let from = location.state?.from?.pathname || "/";

  let signInError;
  if (gUser) {
    navigate("/");
  }

  const createDBUser = (data) => {
    // console.log(data);
    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      img: data.photo,
      shipCode: data.shipCode,
    };
    fetch(`http://localhost:5000/create-user/${data?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(data.email, data.password);
    updateProfile({ displayName: data.name });
    createDBUser(data);
    toast.success("Updated profile");
    navigate("/");
  };
  return (
    <div
      style={{
        backgroundImage: `url("https://www.exfreight.com/wp-content/uploads/2021/07/iStock-1208766085.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "900px",
      }}
      className="flex justify-center  bg-slate-700"
    >
      <div className="flex justify-center items-center  mt-4">
        <div
          style={{
            backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/545/189/286/ship-pirate-ship-boat-sailing-ship-wallpaper-preview.jpg")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100vp",
          }}
          className="card w-96 shadow-2xl bg-violet-200"
        >
          <div className="card-body text-white">
            <h2 className="text-center text-2xl font-bold mb-5">SignUp</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-x-4 text-black">
                <div>
                  <div className="form-control w-full   ">
                    <label className="label">
                      <span className="label-text text-white">Name</span>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      placeholder="Your name"
                      className="input input-bordered bg-white w-full   "
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.name?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* email */}
                  <div className="form-control w-full   ">
                    <label className="label">
                      <span className="label-text text-white">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="input input-bordered bg-white w-full   "
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is Required",
                        },
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Provide a valid Email",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.email?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                      {errors.email?.type === "pattern" && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* Phone */}
                  <div className="form-control w-full   ">
                    <label className="label">
                      <span className="label-text text-white">Phone</span>
                    </label>
                    <input
                      type="phone"
                      placeholder="Write Your Phone Number"
                      className="input input-bordered bg-white w-full   "
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "Phone is Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.phone?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.phone.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div>
                  {/* photo */}
                  <div className="form-control w-full   ">
                    <label className="label">
                      <span className="label-text text-white">Image</span>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="text"
                      placeholder="Your Phone URL"
                      className="input input-bordered bg-white w-full   "
                      {...register("photo", {
                        required: {
                          value: true,
                          message: "Photo is Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.photo?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.photo.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* Ship Number */}
                  <div className="form-control w-full   ">
                    <label className="label">
                      <span className="label-text text-white">Ship Code</span>
                    </label>
                    <input
                      style={{ width: "400px" }}
                      type="n"
                      placeholder="Your Ship Code"
                      className="input input-bordered bg-white w-full   "
                      {...register("shipCode", {
                        required: {
                          value: true,
                          message: "Ship is Required",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.shipCode?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.shipCode.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* Password */}
                  <div className="form-control w-full  ">
                    <label className="label">
                      <span className="label-text text-white">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered text-black font-bold bg-white w-full   "
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is Required",
                        },
                        minLength: {
                          value: 6,
                          message: "Must be 6 characters or longer",
                        },
                      })}
                    />
                    <label className="label">
                      {errors.password?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                      {errors.password?.type === "minLength" && (
                        <span className="label-text-alt text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              {signInError}
              <input
                className="btn w-full text-white mt-9"
                type="submit"
                value="Sign Up"
              />
            </form>
            <p>
              <small></small>
            </p>
            <div className="divider">OR</div>
            <p className="ml-2">Already Have An Account</p>

            <Link
              to="/login"
              className="btn btn-outline  bg-indigo-400 text-black font-extrabold hover:bg-indigo-800"
            >
              Please Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
