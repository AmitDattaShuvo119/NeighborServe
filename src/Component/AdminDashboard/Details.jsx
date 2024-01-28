import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

const Details = () => {
    const {id} = useParams()
    const [allproviderdetails, setAllProviderdetails] = useState([])
    const url = `http://localhost:5000/users/View/${id}`


    const details = useLoaderData()

  const {
   
    user_email,
   
     license_img,
     nid_img,
     
user_phone



  } = details

    useEffect(() => {
        fetch(url)
          .then(res => res.json())
          .then(data => setAllProviderdetails(data))
      }, [])

      console.log(user_email)
  return (
    <div className="card card-side bg-gray-200 shadow-xl mt-36 w-4/5 mx-auto h-[500px] p-12">
<figure><img src={
license_img
} alt="Movie"/></figure>
<div className=' p-3'>  </div>
<figure><img src={
nid_img
} alt="Movie"/></figure>
    <div className="card-body ">
      <h2 className=" font-bold text-blue-400 text-2xl">User Number</h2>
    <div className='bg-black p-8'><p className='text-white text-bold text-xl'>{user_phone}</p></div>
      {/* <div className="card-actions justify-end">
        <button className="btn btn-primary">Watch</button>
      </div> */}
    </div>
  </div>
  )
}

export default Details












