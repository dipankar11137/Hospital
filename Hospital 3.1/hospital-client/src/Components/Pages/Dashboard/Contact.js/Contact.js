import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Contact = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = data => {
    fetch(`http://localhost:5000/contact`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        reset();
        toast.success('Done');
      });
  };
  return (
    <div>
      <div className="py-16 lg:px-16  rounded-xl">
        <h2 className="text-orange-500 text-center text-3xl font-bold uppercase mb-5">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-items-center items-center lg:gap-3 border-2 p-10 rounded-xl">
          <div>
            <img
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt=""
            />
          </div>
          <div>
            <form className="ml-16" onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="form-control w-[400px]  ">
                <label className="label">
                  <span className="label-text text-white font-semibold text-xl">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered bg-white text-black w-full   hover:shadow-xl shadow-inner"
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

              {/* Email */}
              <div className="form-control w-full  ">
                <label className="label">
                  <span className="label-text text-white font-semibold text-xl">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered bg-white text-black w-full   hover:shadow-xl shadow-inner"
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
              {/* Phone */}
              <div className="form-control w-full  ">
                <label className="label">
                  <span className="label-text text-white font-semibold text-xl">
                    Phone
                  </span>
                </label>
                <input
                  type="phone"
                  placeholder="Phone Number"
                  className="input input-bordered bg-white w-full text-black  hover:shadow-xl shadow-inner"
                  {...register('phone', {
                    required: {
                      value: true,
                      message: 'Phone is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.phone?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.phone.message}
                    </span>
                  )}
                  {errors.phone?.type === 'minLength' && (
                    <span className="label-text-alt text-red-500">
                      {errors.phone.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Description */}
              <div className="form-control w-full  ">
                <label className="label">
                  <span className="label-text text-white font-semibold text-xl">
                    Description
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="Description"
                  className="input input-bordered bg-white w-full  text-black hover:shadow-xl shadow-inner pt-1 h-20"
                  {...register('description', {
                    required: {
                      value: true,
                      message: 'Description is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.description?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </label>
              </div>

              <input
                className="btn btn-orange-500 w-full   text-white"
                type="submit"
                value="Contact"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
