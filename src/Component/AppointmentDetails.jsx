import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import "../styles/AppointmentDetails.css";
import { Link, useParams } from "react-router-dom";
import useUser from "../hook/useUser";
import useProvider from "../hook/useProvider";
import axios from "axios";
import Footer from "./Footer/Footer";

const RatingModal = ({ onClose, onSubmit }) => {
  console.log("Rendering RatingModal with props:", { onClose, onSubmit });
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // Perform any actions with rating and review
    onSubmit({ rating, review });

    // Close the modal
    // onClose();
  };

  return (
    <div className="modal">
      <h1>Hello world</h1>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Rate the Pro</h2>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={handleRatingChange}
        />
        <label htmlFor="review">Review:</label>
        <textarea id="review" value={review} onChange={handleReviewChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

const AppointmentDetails = () => {
  const [isUser] = useUser();
  const [isProvider] = useProvider();
  const { searchString } = useParams();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isAppointmentCanceled, setIsAppointmentCanceled] = useState(false);
  const [isJobFinished, setIsJobFinished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmitReview = () => {
    // Perform any actions with rating and review
    console.log("Submitted Rating:", rating);
    console.log("Submitted Review:", review);

    // You can also make an API request to submit the rating and review if needed

    // Close the modal
    setModalOpen(false);
  };

  const apiUrl = `http://localhost:5000/providers/appointment_details/${searchString}/${appointmentId}`;

  useEffect(() => {
    // Fetch appointment details
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setAppointment(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [appointmentId, apiUrl]);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setAppointment(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch appointment details initially
    fetchAppointmentDetails();

    // Set up a periodic fetch every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchAppointmentDetails, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [appointmentId, apiUrl]);

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

  const updateStatus = async (appointmentId, user_id, pro_id, newStatus) => {
    try {
      const apiUrl = `http://localhost:5000/providers/updateAppointment/${pro_id}/${user_id}/${appointmentId}`;
      const response = await axios.patch(apiUrl, { status: newStatus });

      // Update the local state with the new status
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        status: newStatus,
      }));

      setIsJobFinished(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
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
            Status:
          </p>
          <p
            style={{
              fontSize: "15px",
              marginLeft: "2%",
              marginRight: "2%",
              textAlign: "justify",
            }}
          >
            {appointment.status}
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
            {/* <button className="btn btn-primary">Reschedule Appointment</button> */}
            {isProvider && appointment.status !== "Completed" && (
              <button
                className="btn btn-primary text-white"
                onClick={() =>
                  updateStatus(
                    appointment.appointmentId,
                    appointment.user_id,
                    appointment.pro_id,
                    "Completed"
                  )
                }
              >
                Finish Job
              </button>
            )}
            {isUser && appointment.status === "Completed" && !modalOpen && (
              <button
                className="btn btn-primary text-white"
                onClick={() => {
                  console.log("Rate the Pro button clicked");
                  setModalOpen(true);
                }}
              >
                Rate the Pro
              </button>
            )}
            {isUser && appointment.status === "Completed" && modalOpen && (
              <div style={{ border: "1px solid black" }}>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                  />
                </div>
                <label htmlFor="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <label htmlFor="review">Review:</label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <button onClick={handleSubmitReview}>Submit Review</button>
              </div>
            )}
            {!isJobFinished && (
              <Link to={`/view_appointment/${searchString}`}>
                <button
                  className="btn btn-outline btn-primary"
                  onClick={cancelAppointment}
                >
                  Cancel Appointment
                </button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <p>Loading appointment details...</p>
      )}
      <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      {/* <Footer /> */}
    </div>
  );
};

export default AppointmentDetails;
