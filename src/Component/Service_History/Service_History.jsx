import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import SH_SideNav from '../SH_SideNav'
import { useState,useEffect } from 'react'

const Service_History = () => {

  const [serviceHistory, setServiceHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/chatApp/service_history', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setServiceHistory(data);
      })
      .catch((error) => {
        console.error('Error fetching service history:', error);
      });
  }, []);
  
  
  
  // console.log
  return (
    <div className=''>
         <Navbar/>
        <div>
       <div className='flex start-0'>
        <SH_SideNav/>
        <div className="overflow-x-auto ml-20 my-20">
              <div className="table-container">
                <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Provider Name </th>
            <th>Service</th>
            <th>Rating</th>
            <th>Location </th>
            <th>Date/Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {serviceHistory.map((d,_id) => (
            <tr key={_id}>
              <th></th>
              <td>{d.providerName}</td>
              <td>{d.serviceName}</td>
              <td>{d.rating}</td>
              <td>{d.location}</td>
              <td>{d.dateTime}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>

        </div>
       </div>


        </div>
        <div>

            <Footer className=""/>
        </div>
    </div>
  )
}

export default Service_History