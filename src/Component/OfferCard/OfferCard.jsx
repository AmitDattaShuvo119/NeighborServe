import React from 'react';

const OfferCard = () => {
    return (
        <div className='p-3 mx-2 lg:p-8'>
            <div className='bg-primary text-xl text-white text-center p-2 w-[300px]mr-5 lg:w-[600px] h-52 lg:h-40 mx-auto rounded-md'>
                    <h1 className='text-xl font-bold'>We offer 14 days free trail</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id fuga, eos quaerat aspernatur inventore esse cumque</p>
                    <button className='bg-white rounded-sm text-black mt-4 p-2'>Try 14 days free trial </button>
            </div>
        </div>
    );
};

export default OfferCard;