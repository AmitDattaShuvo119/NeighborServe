import React, { useEffect, useState } from 'react';
import ProviderCard from '../ProviderCard/ProviderCard';

const FeatureProvider = () => {

     const [provider,SetProvider] = useState([]);

useEffect (()=> {

   fetch('http://localhost:5000/users/provider').then(res =>res.json()).then(data =>SetProvider(data));
},[])

return (
   <>
   <h1 className=' text-2xl lg:text-4xl  ml-2 font-semibold mb-2 text-center'>Featured Service Providers</h1>
   <div className='bg-secondary '>
  
   <div className='grid grid-cols-1 lg:grid-cols-4 gap-0 p-2 lg:p-3 mb-1 ml-5 lg:ml-12'>       
       {provider.map(item => <ProviderCard
       key={item._id}
       item={item}
       ></ProviderCard>)}
   </div>
   </div>
   </>
);
       

};

export default FeatureProvider;