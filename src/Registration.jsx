import React from "react";
import "./registration.css";

function Registration(){
    return(
    <div>
        <div className="whole">
            <div className="left">

                <div>
                        <p style={{
                            display:"flex",
                            color:"white",
                            justifyContent:"center",
                            marginTop:"170px",
                            fontSize:"20px",
                            fontWeight:"bold",
                        }}>
                            Already have an account?
                        </p>
                        
                        <button className="overlay-btn"
                        style={{
                                    display: "flex",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                    width:"30%",
                                    padding:"10px",
                                    border:"1px",
                                    borderRadius:"10px",
                                    backgroundColor:"#4C40ED",
                                    color:"white",
                          }}>
                            Sign In
                        </button>

                </div> 
            </div>

                <div className="right">
                         <div>
                            <p
                            style={{
                                display: "flex",
                                color: "black",
                                justifyContent: "center",
                                marginTop: "30px",
                                fontSize: "25px",
                                fontWeight: "bold",
                            }}
                            >
                                CREATE AN ACCOUNT
                            </p>

                            <div className="reg-container">
            
                                    <div className="reg-label">First Name*</div>
                                    <input type="text" placeholder="Enter your first name" className="reg-field" />

                                    
                                    <div className="reg-label">Last Name*</div>
                                    <input type="text" placeholder="Enter your last name" className="reg-field" />

                                    
                                    <div className="reg-label">Phone Number*</div>
                                    <input type="text" placeholder="Enter your phone number" className="reg-field" />

                                    
                                    <div className="reg-label">Email*</div>
                                    <input type="text" placeholder="Enter your email address" className="reg-field" />

                                    
                                    <div className="reg-label">Create Password*</div>
                                    <input type="password" placeholder="Create a password" className="reg-field" />
                            </div>

                                <button
                                className="reg-btn"
                                style={{
                                    display: "flex",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    justifyContent: "center",
                                    marginTop: "10px",
                                    width:"30%",
                                    padding:"10px",
                                    border:"1px",
                                    borderRadius:"10px",
                                    backgroundColor:"#4C40ED",
                                    color:"white",
                                  }}
                                >
                                Sign Up
                                </button>
                  </div>
            </div>
         </div>
    </div>

    );
}

export default Registration;