import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Dashboard from "../Component/Dashboard/Dashboard";
import UserDashboard from "../Component/UserDashboard/UserDashboard";
import AdminDashboard from "../Component/AdminDashboard/AdminDashboard";
import ProviderDashboard from "../Component/ProviderDashboard/ProviderDashboard";
import Browse_service from "../Browse_service";
import Service_Result from "../Service_Result";
import Provider_Profile from "../Provider_Profile";
import Appointment from "../Component/Appointment";
import AppointmentDetails from "../Component/AppointmentDetails";
import Login from "../Login/Login";
import Testing from "../Testing";
import Testing2 from "../Testing2";
import Testing3 from "../Testing3";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "testing",
    element: <Testing />,
  },
  {
    path: "testing2",
    element: <Testing2 />,
  },
  {
    path: "testing3",
    element: <Testing3 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "browse_service",
    element: <Browse_service></Browse_service>,
  },
  {
    path: "search_result/:searchString",
    element: <Service_Result></Service_Result>,
  },
  {
    path: "provider_profile/:searchString",
    element: <Provider_Profile />,
  },
 
  {
    path: "view_appointment/:searchString",
    element: <Appointment />,
  },
  {
    path: "appointment_details/:searchString/:appointmentId", // Include searchString and appointmentId
    element: <AppointmentDetails />,
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "userdashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "admindashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "providerdashboard",
        element: <ProviderDashboard></ProviderDashboard>,
      },
    ],
  },
]);
