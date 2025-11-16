import { FaMinus, FaUtensilSpoon } from 'react-icons/fa';
const Welcome = () => {
  return (
    <div className="py-10 px-24 bg-white mt-2">
      <div className="flex items-center text-orange-600 text-xl font-semibold">
        <h1 className="mr-2">Welcome to Smart Health Care</h1>
        <FaMinus />
        <FaUtensilSpoon className="rotate-45" />
      </div>
      <div className="grid grid-cols-12 gap-10">
        <div className=" col-span-5">
          <h1 className="text-3xl font-semibold text-indigo-900 text-start">
            16+ Years of Experience in Serving Mankind
          </h1>
          <a href="http://localhost:3000/about"
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm mt-3 btn-info">Read More</a>
        </div>
        <div className='col-span-7 font-meStyle text-lg -mt-7'>
          <p>
            For close to a hundred years now the Smart Health Care name has been
            synonymous with trust. Trust that has been won and retained by
            successive generations of Smart Health Care people, who have made it their
            mission to give back to the society more than what it draws from it
            for sustenance.
          </p>
          <p className='mt-3'>
            Smart Health Care Hospital & B.K. Roy Research Centre, the 500 bed
            Multi-Specialty Corporate Hospital is built around the core
            principle of selfless, single-minded, and sustainable service with
            ethical practice. Having a pioneering status in the healthcare
            domain in the Eastern part of India with what was and continues to
            be, a world-class facility backed by some of the most acclaimed
            medical practitioners in their respective fields of excellence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;