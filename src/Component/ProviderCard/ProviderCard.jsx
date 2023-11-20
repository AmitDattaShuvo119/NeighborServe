import React from 'react';

const ProviderCard = (props) => {
   
    const {user_fullname,user_category,user_img}= props.item;
  return (
    <div className="my-2 mx-2 lg:my-4 lg:mx-4 ">
      <div className="card  bg-base-100 shadow-xl ">
        <figure className="px-2 pt-2">
          <img
            src={user_img}
            alt="Category Icon"
            className=" w-12 lg:w-20"
          />
        </figure>
        <div className="card-body items-center text-center">
            
        <h2 className="card-title">{user_fullname}</h2>
            
          <h2 className="card-title">{user_category}</h2>
          
        </div>
      </div>
    </div>
  )
};

export default ProviderCard;