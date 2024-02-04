import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import icon from "../../assets/icon.png";
import "./about.css"
const AboutUs = () => {
  return (
    <>
      <div>
        <Navbar />
        <br />
        <br />
        <br /> <br />
        <div className="about_us"
          style={{
            width: "700px",
            width: "700px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="items-center">
            <img src={icon} alt="" style={{ height: "auto", width: "500px", marginLeft:"auto", marginRight:"auto" }} />
          </div>{" "}
          <br /> <br />
          <p style={{ textAlign: "justify" }}>
            Welcome to{" "}
            <span
              style={{ fontSize: "24px", fontWeight: "bold", color: "#4C40ED" }}
            >
              NeighborServe
            </span>
            , your go-to destination for seamless and efficient home services in
            the heart of Bangladesh. In a rapidly advancing technological
            landscape, we recognize the growing need for a platform that
            connects service seekers with local providers effortlessly. Our
            mission is to bridge the gap between technology and the local
            service provider sector, creating a harmonious ecosystem that
            benefits both consumers and service professionals.
          </p>
          <br />
          <br />
          <div>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Meet the Dev Team
            </p>{" "}
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div
                className="avatar"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="w-32 mask mask-squircle">
                  <img src="./amit.png" />
                </div>
                <p style={{ marginLeft: "23px", marginTop: "10px" }}>
                  Amit Datta
                </p>
              </div>

              <div
                className="avatar"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="w-32 mask mask-squircle">
                  <img src="./IMG_7528.JPG" />
                </div>
                <p style={{ marginLeft: "40px", marginTop: "10px" }}>
                  Irfan Ali
                </p>
              </div>

              <div
                className="avatar"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="w-32 mask mask-squircle">
                  <img src="./372966495_2650573871759942_5363892880640410829_n.jpg" />
                </div>
                <p style={{ marginLeft: "-5px", marginTop: "10px" }}>
                  S M Salam Rahman
                </p>
              </div>
            </div>{" "}
            <br />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div
                className="avatar"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="w-32 mask mask-squircle">
                  <img src="./IMG_7525.JPG" />
                </div>
                <p style={{ marginLeft: "-15px", marginTop: "10px" }}>
                  Shihab Hossain Mridul
                </p>
              </div>

              <div
                className="avatar"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="w-32 mask mask-squircle">
                  <img src="./56819066_2252394568316878_3782917773097697280_n.jpg" />
                </div>
                <p style={{ marginLeft: "2px", marginTop: "10px" }}>
                  Arobindo Sarkar
                </p>
              </div>

              <div
                className="avatar"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="w-32 mask mask-squircle">
                  <img src="./e7444f28-6855-40d4-91bd-0ef7f5031189.jpeg" />
                </div>
                <p style={{ marginLeft: "-25px", marginTop: "10px" }}>
                  Mahbub Shahriar Shuvo
                </p>
              </div>
            </div>
          </div>{" "}
          <br />
          <br />
          <p
            style={{
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "bold",
              color:"#4C40ED"
            }}
          >
            Thanks for visiting us
          </p>
        </div>{" "}
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
