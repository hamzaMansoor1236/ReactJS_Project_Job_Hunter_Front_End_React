import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
// import {ToastContainer,toast} from 'react-toastify'

import React from 'react'



function AdminSignUp() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setID] = useState(data.length);

  const[response,setResponse]= useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((json) => setData(json));
    setID(data.length + 1);

    //localStorage.setItem("userdata", JSON.stringify(data));
    //setTempdata(JSON.parse(localStorage.getItem("userdata")))
    //setTempdata(localStorage.getItem("userdata"));
  }, [response]);

  function genderSelect(e) {
    setGender(e.target.value);
  }

  function submit(e) {
    setResponse(true)
    e.preventDefault();
    setID(id + 1);
    if (
      id === "" ||
      name === "" ||
      gender === "" ||
      Birthday === "" ||
      email === "" ||
      password === ""
    ) {
      alert("Fields cannot be empty");
    } else {
      const user = {
        id: id,
        name: name,
        gender: gender,
        birthday: Birthday,
        email: email,
        password: password,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 201) {
          alert("Registration Done, Please Login",{onClose:()=>{navigate("/login")}});
        }
      });
    }
  }

  return (
    <div className="bg-dark" style={{width:"100%",height:"100%",position:"absolute"}}>
    <div className="mt-5 w-50 mx-auto bg-white p-5 rounded-3">
      <div className="container">
        <h1 className="mb-4 display-7 text-sm-center text-lg-start text-md-start text-center">
         Admin Registration
        </h1>
        <form onSubmit={submit} className="row g-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Enter your Full Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label className="form-label">Birthday</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <div
            className="col-lg-6 col-md-6 col-sm-12 col-12"
            style={{ width: "100%" }}
          >
            <label className="form-label">Gender</label>
            <br />
            <input
              className=""
              type="radio"
              id="male"
              value={"Male"}
              checked={gender === "Male"}
              onChange={genderSelect}
              required
            />
            &nbsp;Male &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              className=""
              type="radio"
              id="female"
              value={"Female"}
              checked={gender === "Female"}
              onChange={genderSelect}
              required
            />
            &nbsp;Female
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control "
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control "
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12 text-sm-center text-lg-start text-md-start text-center">
          <button
                type="submit"
                className="btn btn-primary px-5 mt-4"
                onClick={submit}
                id="btn" 
              >
                Signup
              </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AdminSignUp;
