import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import "../styles/Appointment.css";
import { Link, useParams } from "react-router-dom";

const Appointment = () => {
  const { searchString } = useParams();
  const searchString2 = localStorage.getItem("userID");
  const apiUrl = `http://localhost:5000/providers/view_appointment/${searchString2}`;
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.appointments)) {
          setDataArray(data.appointments);
        } else {
          console.error("Appointments data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl]);

  return (
    <div>
      <Navbar />
      <h1>User Appointments</h1>
      <div className="at-container1">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to={"/"}>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <a>Scheduled Appointment</a>
            </li>
          </ul>
        </div>
        <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>
          Scheduled Appointments
        </h1>
        <div className="overflow-x-auto" style={{ marginTop: "3%" }}>
          {dataArray.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>SL</th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    Service Provider Name
                  </th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    Date Added
                  </th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    Scheduled Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataArray.map((appointment, index) => (
                  <tr key={appointment.appointmentId}>
                    <td>{index + 1}</td>
                    <td>
                      {appointment.pro_name} ({appointment.pro_category})
                    </td>
                    <td>{appointment.dateAdded}</td>
                    <td>
                      {appointment.appointmentDate}{" "}
                      <span className="badge badge-ghost badge-sm ml-1">
                        {appointment.appointmentTime}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/appointment_details/${searchString2}/${appointment.appointmentId}`}
                      >
                        <button className="btn btn-primary btn-sm">
                          View details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
