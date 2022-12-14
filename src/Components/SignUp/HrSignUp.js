import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HRSignUp() {
  //object to store data of HR
  const HR = {
    id: "",
    user_name: "",
    email: "",
    password: "",
  };
  ///////////////////////////////////////////////////////////////////

  //navigating to other page
  const navigate = useNavigate();

  //Useeffect to get id of the last HR in database
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/HR", { headers })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("id").value =
          parseInt(data[data.length - 1].id) + 1;
      });
  }, []);
  ////////////////////////////////////////////////////////////////////

  //function that creates new HR in the database
  function Create() {
    HR.id = document.getElementById("id").value;
    HR.user_name = document.getElementById("naam").value;
    HR.email = document.getElementById("email").value;
    HR.password = document.getElementById("password").value;

    //check for username email and password not null
    if (HR.user_name && HR.email && HR.password) {
      //posting data to database via fetch method
      fetch("http://localhost:5000/HR", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(HR),
      })
        .then((response) => response.json())
        .then((info) => {
          console.log("Response from server" + info);
        });
      ///////////////////////////////////////////////////////////////
      alert("Sign Up Successful");
      navigate("/hrlogin");
    } else {
      alert("Please fill the fields");
    }
    /////////////////////////////////////////////////////////////////
  }

  return (
    <div className="container mt-5 ">
      <h1 className="text-primary">HR Sign Up</h1>
      <br></br>
      {/* form  */}
      <form onSubmit={Create}>
        {/* ID input field */}
        <div>
          <label>
            <b>ID</b>{" "}
          </label>
          <input type="number" className="form-control" id="id" disabled />
        </div>
        {/* ///////////////////////////////////////////////////////// */}
        <br></br>
        {/* username input field */}
        <div>
          <label>
            <b>Username</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="naam"
            placeholder="Enter Username"
            required
          />
        </div>
        {/* ///////////////////////////////////////////////////////// */}
        <br></br>
        {/* Email input  field*/}
        <div>
          <label>
            <b>Email address</b>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        {/* ///////////////////////////////////////////////////////// */}
        <br></br>
        {/* Password input field*/}
        <div>
          <label>
            <b>Password</b>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            required
            minLength={3}
            maxLength={16}
          />
        </div>
        {/* ///////////////////////////////////////////////////////// */}

        <br></br>
        {/* Buttons login and sign up */}
        <div>
          <button type="submit" className="btn btn-outline-primary custom">
            Sign Up
          </button>

          <button
            className="btn btn-outline-primary mx-3 custom"
            onClick={() => {
              navigate("/Hrlogin");
            }}
          >
            Login
          </button>
        </div>
        {/* ///////////////////////////////////////////////////////// */}
        <br></br>
      </form>
      {/* Form ends ///////////////////////////////////////////////// */}
    </div>
  );
}

export default HRSignUp;
