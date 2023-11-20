import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import "../styles/AppointmentDetails.css";
import { Link, useParams } from "react-router-dom";
// import { ap } from "./ap";
const AppointmentDetails = () => {
  const { searchString } = useParams();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isAppointmentCanceled, setIsAppointmentCanceled] = useState(false);

  const apiUrl = `http://localhost:5000/providers/appointment_details/${searchString}/${appointmentId}`;
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setAppointment(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [appointmentId]);

  const cancelAppointment = () => {
    // Make an API request to cancel the appointment
    fetch(
      `http://localhost:5000/providers/cancel_appointment/${searchString}/${appointmentId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, you can display a message to the user
        if (data.message === "Document deleted successfully") {
          setIsAppointmentCanceled(true);
          setTimeout(() => {
            setIsAppointmentCanceled(false);
          }, 2000);
        } else {
          alert("Failed to cancel the appointment.");
        }
      })
      .catch((error) => {
        console.error("Error canceling appointment:", error);
      });
  };

  return (
    <div>
      <Navbar />{" "}
      {isAppointmentCanceled && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
        </div>
      )}
      {appointment ? (
        <div className="ad-container1">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to={"/"}>
                  {" "}
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link to={`/view_appointment/${searchString}`}>
                  {" "}
                  <a>Scheduled Appointments</a>
                </Link>
              </li>
              <li>Appoinment {appointment.appointmentId}</li>
            </ul>
          </div>

          <p style={{ fontSize: "22px", marginLeft: "1%", marginTop: "1%" }}>
            Scheduled Appointment with with{" "}
            <Link to={`/provider_profile/${appointment.pro_id}`}>
              {" "}
              <span style={{ fontWeight: "bold", color: "#4C40ED" }}>
                {appointment.pro_name}
              </span>
            </Link>
          </p>
          <br />
          <div style={{ display: "flex" }}>
            <Link to={`/provider_profile/${appointment.pro_id}`}>
              {" "}
              <div className="avatar" style={{ marginLeft: "2%" }}>
                <div className="w-32 rounded">
                  <img
                    src={appointment.pro_img}
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>{" "}
            </Link>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "250px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  marginLeft: "2%",
                  fontWeight: "bold",
                }}
              >
                <Link to={`/provider_profile/${appointment.pro_id}`}>
                  {" "}
                  {appointment.pro_name}
                </Link>
              </p>
              <p style={{ marginLeft: "2%", color: "#4C40ED" }}>
                {appointment.pro_category}
              </p>
            </div>
          </div>
          <p
            style={{
              marginTop: "1%",
              fontSize: "16px",
              marginLeft: "2%",
              fontWeight: "bold",
            }}
          >
            Appointment added on:{" "}
            <span style={{ fontWeight: "normal" }}>
              {appointment.dateAdded}
            </span>
          </p>
          <p
            style={{
              fontSize: "16px",
              marginLeft: "2%",
              fontWeight: "bold",
            }}
          >
            Scheduled Appointment Date:{" "}
            <span style={{ fontWeight: "normal" }}>
              {appointment.appointmentDate}
            </span>
            <br />
            Scheduled Appointment Time:{" "}
            <span style={{ fontWeight: "normal" }}>
              {appointment.appointmentTime}
            </span>
          </p>
          <p
            style={{
              fontSize: "16px",
              marginLeft: "2%",
              marginTop: "1%",
              color: "#4C40ED",
              fontWeight: "bold",
            }}
          >
            Address:
          </p>
          <p
            style={{
              fontSize: "15px",
              marginLeft: "2%",
              marginRight: "2%",
              textAlign: "justify",
            }}
          >
            {appointment.homeAddress}
          </p>
          <p
            style={{
              fontSize: "16px",
              marginLeft: "2%",
              marginTop: "1%",
              color: "#4C40ED",
              fontWeight: "bold",
            }}
          >
            Note:
          </p>
          <p
            style={{
              fontSize: "15px",
              marginLeft: "2%",
              marginRight: "2%",
              textAlign: "justify",
            }}
          >
            {appointment.note}
          </p>

          <div className="ad-container2">
            <button className="btn btn-primary">Reschedule Appointment</button>

            <Link to={`/view_appointment/${searchString}`}>
              <button
                className="btn btn-outline btn-primary"
                style={{ marginLeft: "2%" }}
                onClick={cancelAppointment}
              >
                Cancel Appointment
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading appointment details...</p>
      )}
    </div>
  );
};

export default AppointmentDetails;
