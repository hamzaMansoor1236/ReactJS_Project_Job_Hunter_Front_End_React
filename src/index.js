import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

//For routing purpose
import { BrowserRouter, Routes, Route } from "react-router-dom";

//importing <Home/> component
import Home from "./Components/Home/Home";
//importing <NotFound/> component
import NotFound from "./Components/Not Found/NotFound";
import UserLogin from "./Components/Login/UserLogin";
import UserDashboard from "./Components/Dashboard/UserDashboard/UserDashBoard";
import HrLogin from "./Components/Login/HrLogin";
import HRDashboard from "./Components/Dashboard/HrDashboard/HrDashboard";

//root element of the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Routes of the application  */}
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/UserLogin" element={<UserLogin></UserLogin>}></Route>
        <Route path="/UserDashboard" element={<UserDashboard></UserDashboard>}></Route>
        
        {/* HR routes */}
        <Route path="/HRLogin" element={<HrLogin></HrLogin>}></Route>
        <Route path="/HRDashboard" element={<HRDashboard></HRDashboard>}></Route>

        

        {/* Not found Route */}
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
