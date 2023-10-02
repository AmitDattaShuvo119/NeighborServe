import React from "react";

export const WallRepairService = () => {
  return (
    <div>
       <div className="card w-64 h-60 bg-base-100 shadow-xl md:w-52 md:h-48 sm:w-40 sm:h-36 lg:w-64 lg:h-60">
        <figure>
          <img src="wall.jpg" alt="Electrical Service" />
        </figure>
        <div className="card-body flex justify-center items-center">
          <h2 className="card-title text-black">Wall/Ceiling Repair</h2>
          <div className="card-actions justify-end">
            <button class="btn1">Browse</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallRepairService;
