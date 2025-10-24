import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Footer from '../../Share/Footer';

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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(response => {
          reset();
          toast.success('Data submitted successfully!');
        })
        .catch(error => {
          console.error(error);
          toast.error('Submission failed. Please try again.');
        });
    };
  return (
    <div>
      <div className="pt-20 pl-10 pb-20 text-indigo-900">
        <h1 className="text-4xl font-semibold uppercase">Contact us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-items-center items-center lg:gap-3 border-2 px-10 py-3 rounded-xl">
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
                  <span className="label-text text-white font-semibold text-lg">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered bg-slate-200 text-black w-full h-10  hover:shadow-xl shadow-inner"
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
              <div className="form-control w-full  -mt-4">
                <label className="label">
                  <span className="label-text text-white font-semibold text-lg">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered bg-slate-200 text-black w-full h-10   hover:shadow-xl shadow-inner"
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
              <div className="form-control w-full  -mt-4">
                <label className="label">
                  <span className="label-text text-white font-semibold text-lg">
                    Phone
                  </span>
                </label>
                <input
                  type="phone"
                  placeholder="Phone Number"
                  className="input input-bordered bg-slate-200 w-full text-black h-10 hover:shadow-xl shadow-inner"
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
              <div className="form-control w-full  -mt-4">
                <label className="label">
                  <span className="label-text text-white font-semibold text-xl">
                    Description
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="Description"
                  className="input input-bordered bg-slate-200 w-full  text-black hover:shadow-xl shadow-inner pt-1 h-20"
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
                className="btn btn-primary w-full   text-white"
                type="submit"
                value="Contact"
              />
            </form>
          </div>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Address</h1>
          <p className="mt-2 text-2xl  text-rose-800 ">
            Smart Healthcare, Dhanmondi 14/A, Dhaka-1209, Dhaka, Bangladesh
            Dhaka-1000
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Mobile</h1>
          <p className="mt-2 text-2xl  text-indigo-800 ">
            Shovon <span className="text-red-700 ml-5">(+8801754125846)</span>
          </p>
          <p className="mt-2 text-2xl  text-indigo-800 ">
            Abbus Uddin{' '}
            <span className="text-red-700 ml-5">(+8801754125846)</span>
          </p>
          <p className="mt-2 text-2xl  text-indigo-800 ">
            Asif Hossion{' '}
            <span className="text-red-700 ml-5">(+8801754125846)</span>
          </p>
          <p className="mt-2 text-2xl  text-indigo-800 ">
            Shovon Saha{' '}
            <span className="text-red-700 ml-5">(+8801754125846)</span>
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Facebook</h1>
          <p className="mt-2 text-2xl  text-rose-800 cursor-pointer">
            Smart Healthcare
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Address</h1>
          <p className="mt-2 text-2xl  text-rose-800 cursor-pointer">
            Smart Healthcare
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Address</h1>
          <p className="mt-2 text-2xl  text-rose-800 cursor-pointer">
            smarthealthcare@gmail.com
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Address</h1>
          <p className="mt-2 text-2xl  text-rose-800 cursor-pointer">
            Smart Healthcare
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;