//import { useEffect } from "react";
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
  //commented as no more required
  // //Useeffect to get id of the last HR in database
  // useEffect(() => {
  //   const headers = { "Content-Type": "application/json" };
  //   fetch("http://localhost:5000/HR", { headers })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       document.getElementById("id").value =
  //         parseInt(data[data.length - 1].id) + 1;
  //     });
  // }, []);
  // ////////////////////////////////////////////////////////////////////

  //function that creates new HR in the database
  function Create() {
    let rand = Math.random() * 10000;
    console.log(rand); // say 99.81321410836433

    rand = Math.floor(rand); // 99
    HR.id = rand;
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
      <h1 className="text-success">HR Sign Up</h1>
      {/* form  */}
      <form onSubmit={Create}>
        {/* ID input field */}
        <div>
          <label>
            <b className="text-success" hidden={true}>ID</b>{" "}
          </label>
          <input type="number" className="form-control" id="id" disabled hidden={true} />
        </div>
        {/* ///////////////////////////////////////////////////////// */}
        
        {/* username input field */}
        <div>
          <label>
            <b className="text-success">Username</b>
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
            <b className="text-success">Email address</b>
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
            <b className="text-success">Password</b>
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
          <button type="submit" className="btn btn-outline-success custom">
            Sign Up
          </button>

          <button
            className="btn btn-outline-success mx-3 custom"
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
