import React, { useState, useEffect } from "react";
import Navbar from "./Component/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import useUser from "./hook/useUser";
import Footer from "./Component/Footer/Footer";
import "./styles/UserProfile.css";
const UserProfile = () => {
  const userId = localStorage.getItem("userID");
  const [isUser] = useUser();
  const { searchString } = useParams();
  const searchString2 = localStorage.getItem("userID");
  const apiUrl = `http://localhost:5000/providers/providersProfile?id=${userId}`;
  const [dataArray, setDataArray] = useState([]);
  const x = "Client";
  const y = "Pro's Name";
  const [location, setLocation] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);
  const [usertype, setUsertype] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && data[0].user_location) {
        setLocation(data[0].user_location);
        setUserEmail(data[0].user_email);
        setPhone(data[0].user_phone);
        setName(data[0].user_fullname);
        setImg(data[0].user_img);
        setUsertype(data[0].user_status);
        console.log(location); // Note: This log might not reflect the updated state immediately due to the asynchronous nature of setState
      }
      if (Array.isArray(data[0].appointments)) {
        setDataArray(data[0].appointments);
        console.log(dataArray);
      } else {
        console.error("Appointments data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(fetchData, 500); // Fetch data every 5 seconds (adjust as needed)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiUrl]);

  useEffect(() => {
    // Your logic for handling changes in dataArray
    console.log("dataArray has changed:", dataArray);
  }, [dataArray]);
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="up-container1">
        <div className="up-container2">
          <div className="up-container3">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
                height: "100%", // Ensure the container takes full height
              }}
            >
              {" "}
              <div className="avatar">
                <div
                  className="w-36 rounded-full"
                  style={{ border: "2px #4C40ED groove" }}
                >
                  <img src={img} />
                </div>
              </div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontSize: "24px",
                }}
              >
                {name}
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  color: "#4C40ED",
                }}
              >
                {usertype} User
              </p>
            </div>
          </div>
          <div className="up-container4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
                marginLeft: "20px",
              }}
            >
              <ul>
                <li>
                  <p style={{ fontSize: "22px" }}>Address</p>
                </li>
                <li>
                  <div style={{ display: "flex" }}>
                    {" "}
                    <img src="./gps.svg" alt="" />
                    &nbsp;&nbsp; <p style={{ color: "#6B6E81" }}>{location}</p>
                  </div>
                </li>
                <br />
                <li>
                  <p style={{ fontSize: "22px" }}>Contact</p>
                </li>
                <li>
                  {" "}
                  <div style={{ display: "flex" }}>
                    {" "}
                    <img src="./email.svg" alt="" />
                    &nbsp;&nbsp; <p style={{ color: "#6B6E81" }}>{userEmail}</p>
                  </div>
                </li>
                <li>
                  {" "}
                  <div style={{ display: "flex" }}>
                    {" "}
                    <img src="./call.svg" alt="" />
                    &nbsp;&nbsp;{" "}
                    <p style={{ color: "#6B6E81", marginTop: "2px" }}>
                      {phone}
                    </p>
                  </div>
                </li>
                <br />
                <li style={{ marginTop: "10px" }}>
                  <button
                    className="btn btn-active"
                    style={{
                      backgroundColor: "#4C40ED",
                      color: "white",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Edit Profile
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-active"
                    style={{
                      backgroundColor: "#fff",
                      color: "#4C40ED",
                      border: "1px solid #4C40ED",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Disable Profile
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <div
          className="up-container5"
          style={{
            backgroundColor: "white",
            justifySelf: "center",
            flexDirection: "column",
            paddingTop: "10px",
          }}
        >
          <p style={{ fontSize: "18px", marginLeft: "20px" }}>
            Previous appointments
          </p>{" "}
          <hr style={{ marginTop: "-15px" }} />
          <div
            className="overflow-x-auto"
            style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}
          >
            {dataArray.length > 0 ? (
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Appointment ID</th>
                    <th>Service Provider</th>
                    <th>Service Type</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {dataArray
                    .filter((appointment) => appointment.status === "Done")
                    .map((appointment, index) => (
                      <tr key={appointment.appointmentId}>
                        <td>{appointment.appointmentId}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={appointment.pro_img}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {appointment.pro_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{appointment.pro_category}</td>
                        <td>
                          {appointment.appointmentDate}
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            {appointment.appointmentTime}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
                {/* foot */}
              </table>
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
