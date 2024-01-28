import React from 'react';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


const OnBoard_Verification = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row"> {/* Use flex classes for responsiveness */}
        
        <form
          action=""
          method="post"
          className="card card-compact w-full md:w-96 bg-base-100 shadow-xl m-2 lg:mx-80 md:ml-4 md:my-20 "
        >
          <span className="label-text text-primary text-left">Details</span>
          <div className="card w-full"> {/* Adjust card width */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">NID Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter your 10 digit NID number"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type your Name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                className="input input-bordered w-full"
              />
            </div>
            <div className="card-actions flex justify-center"> {/* Center the button */}
              <button className="bg-primary rounded-xl w-40 h-10 mt-10 text-white ">
                Verify
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default OnBoard_Verification;
