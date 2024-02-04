import React, { useState, useEffect } from "react";
import "./verification.css";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import axios from "axios";

const Verification = () => {
  const [progress, setProgress] = useState(0);
  const [statecount, setStatecount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const userId = localStorage.getItem("userID");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [percentage, setPercentage] = useState("0%");
  const [submissionStatus, setSubmissionStatus] = useState("0");
  const apiUrl = `http://localhost:5000/providers/providersProfile?id=${userId}`;
  const [dataArray, setDataArray] = useState([]);
  const [phoneAvailablity, setPhoneAvailability] = useState("0");
  const [nidAvailability, setNidAvailability] = useState("0");
  const [licenseAvailability, setLicenseAvailability] = useState("0");

  console.log("now state: ", statecount);

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    updateProgress();
  }, [phoneAvailablity, nidAvailability, licenseAvailability]);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        if (
          data[0] &&
          data[0]?.user_phone !== null &&
          data[0]?.user_phone !== "" &&
          data[0].user_phone !== undefined
        ) {
          setPhoneAvailability("1");
          setPhoneNumber(data[0].user_phone);
          console.log(data[0].user_phone);
        }

        if (
          data[0] &&
          data[0]?.nid_img !== null &&
          data[0].nid_img !== undefined
        ) {
          setNidAvailability("1");
          setImageUrl(data[0].nid_img);
          console.log(data[0].nid_img);
        }

        if (
          data[0] &&
          data[0]?.license_img !== null &&
          data[0].license_img !== undefined
        ) {
          setLicenseAvailability("1");
          setImageUrl2(data[0].license_img);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateProgress = () => {
    let newProgress = progress;

    if (phoneAvailablity === "1") {
      newProgress++;
      setStatecount(statecount + 1);
    }

    if (nidAvailability === "1") {
      newProgress++;
      setStatecount(statecount + 1);
    }

    if (licenseAvailability === "1") {
      newProgress++;
      setStatecount(statecount + 1);
    }

    setProgress(newProgress);
    calculateWidth(newProgress);
  };

  const calculateWidth = (currentProgress) => {
    console.log(currentProgress);
    if (currentProgress === 1) {
      setPercentage("25%");
    } else if (currentProgress === 2) {
      setPercentage("50%");
    } else if (currentProgress === 3) {
      setPercentage("100%");
    } else setPercentage("0%");
    // const width = (currentProgress / 3) * 100 + "%";
    // setPercentage(width);
  };

  useEffect(() => {
    // Your logic for handling changes in dataArray
    console.log("dataArray has changed:", dataArray);
  }, [dataArray]);

  const handlePhoneNumberChange = async (x) => {
    setPhoneNumber(x);
    console.log("Phone number " + phoneNumber);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    increaseProgress2();
    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=29ece6b8b3a3a74d990e6534dd31ece7",
      formData
    );

    setImageUrl(response.data.data.url);
    console.log("Uploaded Image URL:", response.data.data.url);
  };

  const handleImageChange2 = (event) => {
    setSelectedImage2(event.target.files[0]);
  };

  const handleImageUpload2 = async () => {
    increaseProgress2();
    const formData = new FormData();
    formData.append("image", selectedImage2);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=29ece6b8b3a3a74d990e6534dd31ece7",
      formData
    );

    setImageUrl2(response.data.data.url);
    console.log("Uploaded Image URL:", response.data.data.url);
  };

  const handleSubmit = async () => {
    try {
      setSubmissionStatus("1");
      // Fetch userId from the backend based on the user's email
      // const userId = data[0]._id; // Assuming you have a single userId associated with the email
      const apiUrl1 = `http://localhost:5000/providers/updateVerificationStatus/${userId}`;

      const data1 = {
        user_phone: phoneNumber,
        nid_img: imageUrl,
        license_img: imageUrl2,
        user_verificationStatus2: percentage,
        admin_approval: 0,
      };

      axios
        .patch(apiUrl1, data1)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error fetching userId:", error);
    }
  };

  // const increaseProgress2 = () => {
  //   setStatecount(statecount + 1);
  //   // if (phoneNumber.trim() !== "") {
  //   setProgress(progress + 1);
  //   calculateWidth();
  //   console.log(progress);
  //   // } else {
  //   //   setError("Please enter a phone number");
  //   // }
  // };

  const increaseProgress2 = () => {
    // Check if the current step requires user input
    if (
      (statecount === 0 && phoneAvailablity === "0") ||
      (statecount === 1 && nidAvailability === "0") ||
      (statecount === 2 && licenseAvailability === "0")
    ) {
      // Check if user input is provided
      if (
        (statecount === 0 && phoneNumber.trim() !== "") ||
        (statecount === 1 && selectedImage !== null) ||
        (statecount === 2 && selectedImage2 !== null)
      ) {
        setProgress(progress + 1);
        calculateWidth(progress + 1);
        setStatecount(statecount + 1);
      } else {
        // Handle the case where user input is required but not provided
        console.error("Please provide the required input.");
      }
    } else {
      // For steps that don't require user input, just update the state count
      setStatecount(statecount + 1);
    }
  };

  const handleSkip = () => {
    if (percentage >= "67%") {
      setStatecount(3);
    } else {
      setStatecount(statecount + 1);
    }
  };

  // const handleSubmit = () => {
  //   setVerificationSuccess(true);
  //   setProgress(100);
  // };

  return (
    <>
      <Navbar></Navbar>
      <div className="verification-main">
        <div className="verification-middle">
          <div style={{ marginRight: "260px" }}>
            <label
              style={{
                color: "#4C40ED",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              Verify
            </label>{" "}
            yourself
          </div>
          <br />A <label className="text-primary font-bold"> verified </label>
          service pro has more chance of getting a task.
          <div className="verification-card">
            <div className="inside1">
              {submissionStatus === "0" && (
                <label
                  className="text-primary font-bold"
                  style={{ marginRight: "30px" }}
                >
                  {" "}
                  Verification progress{" "}
                </label>
              )}

              {submissionStatus === "0" && (
                <div>
                  <div
                    style={{
                      width: "100%",
                      height: "20px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: percentage,
                        height: "100%",
                        backgroundColor: "#4C40ED",
                        borderRadius: "8px",
                        transition: "width 0.3s ease-in-out",
                      }}
                    ></div>
                  </div>

                  <div style={{ marginTop: "10px", marginRight: "350px" }}>
                    {`${percentage} verified`}
                  </div>
                </div>
              )}
            </div>

            <div className="inside2">
              {submissionStatus === "0" && (
                <label
                  className="text-primary font-bold"
                  style={{ marginRight: "30px" }}
                >
                  {" "}
                  {licenseAvailability === "0" && statecount === 2
                    ? "Upload Work License PDF"
                    : statecount === 1 && nidAvailability === "0"
                    ? "Upload NID Card PDF"
                    : statecount === 0 && phoneAvailablity === "0"
                    ? "Phone number"
                    : ""}{" "}
                </label>
              )}

              {(submissionStatus === "0" &&
                nidAvailability === "0" &&
                statecount === 1) && (
                  <div style={{ display: "flex" }}>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    />{" "}
                    &nbsp;{" "}
                    <button
                      onClick={handleImageUpload}
                      className="btn btn-square"
                    >
                      <img src="./upload.svg" alt="" />
                    </button>
                  </div>
                )}
              {statecount === 2 &&
                submissionStatus === "0" &&
                licenseAvailability === "0" && (
                  <div style={{ display: "flex" }}>
                    <input
                      type="file"
                      onChange={handleImageChange2}
                      className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    />{" "}
                    &nbsp;{" "}
                    <button
                      onClick={handleImageUpload2}
                      className="btn btn-square"
                    >
                      <img src="./upload.svg" alt="" />
                    </button>
                  </div>
                )}

              {(phoneAvailablity === "0" && statecount === 0 ) &&  (
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="phone-number"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                />
              )}
            </div>

            {statecount >= 2 && submissionStatus === "0" && (
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            )}

            {phoneAvailablity === "0" && statecount === 0 && (
              <button className="continue-btn" onClick={increaseProgress2}>
                Next
              </button>
            )}
            {(statecount === 0 ||
              (statecount === 1 && percentage !== "100%")) && (
              <button className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
            )}
            {(submissionStatus === "1" || percentage === "100%") && (
              <p style={{ marginTop: "110px" }}>
                <label style={{ color: "#4C40ED", fontWeight: "bold" }}>
                  Submitted.
                </label>{" "}
                Wait for Admin approval now. Thank you!
              </p>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer></Footer>/
    </>
  );
};

export default Verification;
