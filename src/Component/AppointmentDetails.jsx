import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar/Navbar";
import "../styles/AppointmentDetails.css";
import { Link, useParams } from "react-router-dom";
import useUser from "../hook/useUser";
import useProvider from "../hook/useProvider";
import axios from "axios";
import Footer from "./Footer/Footer";
import { AuthContext } from "../Providers/AuthProviders";

const AppointmentDetails = () => {
  const [isUser] = useUser();
  const [isProvider] = useProvider();
  const { searchString } = useParams();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isAppointmentCanceled, setIsAppointmentCanceled] = useState(false);
  const [isJobFinished, setIsJobFinished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const { user, logout } = useContext(AuthContext);
  const userId = localStorage.getItem("userID");
  const userImg = localStorage.getItem("userImg");
  const [buttonText, setButtonText] = useState("Submit now");

  function formatDateToDDMMYYYY(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handleSubmitReview = (pro_id, appointmentId) => {
    if (!review.trim()) {
      // Comment is empty, you can prevent the submission or show an error message
      alert("Please add a comment before submitting.");
      return;
    }

    setButtonText("Submitted");
    const apiUrl = `http://localhost:5000/providers/post_review/${pro_id}`;

    const newReview = {
      reviewId: userId,
      reviewerId: userId,
      reviewerName: user.displayName,
      reviewerImg: userImg,
      review: review,
      date: formatDateToDDMMYYYY(new Date()),
    };
    axios
      .post(apiUrl, newReview)
      .then((response) => {
        // navigate(`/view_appointment/${searchString2}`);
        alert("Feedback submitted successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    const apiUrl1 = `http://localhost:5000/providers/update_pro/${pro_id}`;
    const data1 = {
      user_rating: rating,
    };

    axios
      .patch(apiUrl1, data1)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    updateStatus(appointmentId, userId, pro_id, "Done");

    // Close the modal
    console.log("rating: ", rating);
    console.log("Submitted Review:", newReview);
    setTimeout(() => {
      setModalOpen(false);
    }, 3000);
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
            {isProvider && appointment.status === "Accepted" && (
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
            <div
              className={
                isUser && appointment.status === "Completed" && modalOpen
                  ? "ad-modal-container"
                  : "hidden"
              }
            >
              <div className="ad-modal-content">
                <div style={{ display: "flex", gap: "8px" }}>
                  <img src="./feedback.svg" alt="" />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Feedback
                  </p>
                </div>
                <hr style={{ marginTop: "10px" }} />
                <br />
                <br />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  Give your feedback
                </p>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#B0B2B7",
                  }}
                >
                  Share your thoughts and help others make informed decisions!
                  Let us know what you liked or any areas where there's room for
                  improvement. Your feedback is valuable to our community
                </p>
                <br />
                <div
                  className="rating"
                  style={{
                    justifyContent: "center",
                    gap: "7px",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <input
                      key={value}
                      type="radio"
                      name="rating-1"
                      className="mask mask-star-2 bg-blue-purple w-8 h-8"
                      value={value}
                      checked={rating === value}
                      onChange={() => setRating(value)}
                    />
                  ))}
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    style={{ width: "100%" }}
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="textarea textarea-primary"
                    placeholder="Add a comment"
                    required
                  ></textarea>
                  <br />
                  <button
                    onClick={() =>
                      handleSubmitReview(
                        appointment.pro_id,
                        appointment.appointmentId,
                        appointment.user_id
                      )
                    }
                    className="btn btn-wide ad-modal-btn"
                    disabled={buttonText === "Submitted"} // Disable the button when it's in the "Submitted" state
                  >
                    {buttonText}{" "}
                    {buttonText === "Submitted" && (
                      <img src="./submitted.svg" alt="" />
                    )}
                  </button>
                </div>

                <br />
              </div>
            </div>
            {!isJobFinished && (appointment.status === "Pending" || appointment.status === "Accepted") && (
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
