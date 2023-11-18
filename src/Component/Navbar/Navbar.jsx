import { Link , useLocation, useNavigate  } from "react-router-dom"
import icon from "../../assets/icon.png"
import "./index.css"
import { AuthContext } from "../../Providers/AuthProviders"
import { useContext, useEffect, useState } from "react"
import useAdmin from "../../hook/useAdmin"

import useUser from "../../hook/useUser"
import useProvider from "../../hook/useProvider"


const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext)
  // const [isHovering, setIsHovering] = useState(false)
  const [isAdmin] = useAdmin()
  const [isProvider] = useProvider()
  const [isUser] = useUser()

  console.log("admin", isAdmin)
  console.log("provider", isProvider)
  console.log("user", isUser)
  // console.log(user);


  const handleLogOut = () => {
    logout()
      .then()
      .catch(error => {
        console.log(error)
      })
      navigate('/login')
  }
  // const handleMouseEnter = () => {
  //   setIsHovering(true)
  // }

  // const handleMouseLeave = () => {
  //   setIsHovering(false)
  // }

  return (
    <div className="border border-b c2" style={{ height: "82px" }}>
      <div className="navbar bg-base-100">
        <div className="navbar">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-xl">
                <Link to={"/"}>
                  <a>Home</a>
                </Link>
              </li>
              <li className="text-xl">
                <Link to={"/browse_service"}>
                  <a>Services</a>
                </Link>
              </li>
              <li className="text-xl ">
                <a>Sign Up</a>
              </li>
              <li className="text-xl ">
                <Link to={"/login"}>
                  <a>Login</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Link to={"/"}>
              <img className="w-42 h-12" src={icon} alt="" />
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", width: "900px" }}>
          <ul>
            <Link to={"/"} className="text-xl c1 mr-7">
              Home
            </Link>

            <Link to={"/browse_service"} className="text-xl c1">
              Services
            </Link>
            {!user && (
<<<<<<< HEAD
              <Link to={"/login"} className="text-xl ml-8 c1">
                Log in
              </Link>
            )}

            {/* {user ? (
=======
              <Link to={"/reg"} className="text-xl ml-8 c1">
                Sign Up
              </Link>
            )}

            {user ? (
>>>>>>> d94574d6bd6d8e32706e5efad35e020ac444c4e2
              <button className="text-xl mx-8" onClick={handleLogOut}>
                LogOut
              </button>
            ) : (
              <Link to={"/login"} className="text-xl ml-8 mr-8 c1">
                Log In
              </Link>
<<<<<<< HEAD
            )} */}
            {/* {isAdmin && (
=======
            )}
            {isAdmin && (
>>>>>>> d94574d6bd6d8e32706e5efad35e020ac444c4e2
              <Link to={"/dashboard/admindashboard"} className="text-xl c1">
                Dashboard
              </Link>
            )}
            {isProvider && (
              <Link to={"/dashboard/providerdashboard"} className="text-xl c1">
                Dashboard
              </Link>
            )}
            {isUser && (
              <Link to={"/dashboard/userdashboard"} className="text-xl c1">
                Dashboard
              </Link>
<<<<<<< HEAD
            )} */}
=======
            )}
>>>>>>> d94574d6bd6d8e32706e5efad35e020ac444c4e2
          </ul>
        </div>

        <div>
          {!user && (
            <button className="bg-primary mr-24 p-1 lg:p-2 lg:text-xl rounded-md n-btn1">
              <Link className="text-white " to={"/service"}>
                Become a Provider
              </Link>
              {/* Become a Pro */}
            </button>
          )}

          <div>
            {user && (
              <div
                className="relative cursor-pointer"
<<<<<<< HEAD
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                <div className="flex gap-2 mr-24">
                  <div className="dropdown">
                    <button tabIndex={0} className=" m-1  rounded-full ">
                      <img
                        className="rounded-full w-14 h-14 mr-12 border border-blue-500 "
                        src={user.photoURL}
                        alt=""
                      />
                    </button>

                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow  mt-3 rounded-box w-40 "
                    >
                      <li>
                        <Link>Profile </Link>
                      </li>
                      <li>
                        {isAdmin && (
                          <Link
                            to={"/dashboard/admindashboard"}
                            className="text-sm "
                          >
                            Dashboard
                          </Link>
                        )}
                        {isProvider && (
                          <Link
                            to={"/dashboard/providerdashboard"}
                            className="text-sm "
                          >
                            Dashboard
                          </Link>
                        )}
                        {isUser && (
                          <Link
                            to={"/dashboard/userdashboard"}
                            className="text-sm "
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>
                      <li>
                        <Link>
                          {user ? (
                            <button className="text-sm " onClick={handleLogOut}>
                              Log Out
                            </button>
                          ) : (
                            <Link
                              to={"/login"}
                              className="text-xl ml-8 mr-8 c1"
                            >
                              Log In
                            </Link>
                          )}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p>{user.displayName}</p>
                  </div>
                </div>

                {/* {isHovering && (
                                <div className="absolute transform -translate-x-1/2 bg-white shadow-lg rounded-lg py-2 px-4">
                                    <p className="text-gray-800">{user.displayName}</p>
                                </div>
                            )} */}
=======
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex gap-2">
                  <img
                    className="rounded-full w-32 h-12 mr-12 border border-blue-500 "
                    src={user.photoURL}
                    alt=""
                  />
                </div>

                {isHovering && (
                  <div className="absolute transform -translate-x-1/2 bg-white shadow-lg rounded-lg py-2 px-4">
                    <p className="text-gray-800">{user.displayName}</p>
                  </div>
                )}
>>>>>>> d94574d6bd6d8e32706e5efad35e020ac444c4e2
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// export const userData = user.email;
export default Navbar;
