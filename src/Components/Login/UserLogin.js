import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function UserLogin() {
  //array to fetch all the users
  var [usersArr, setUserArr] = useState([]);

  //regular expression for email validation
  let regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  //state of the Email and Password
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  //boolean for form submission alert
  var [isSubmit, setSubmit] = useState(false);

  //boolean for email error alert
  var [emailOk, setEmailOk] = useState(true);

  var userFound=false;

  //navigation handling to the Userdashboard
  var navigate = useNavigate();

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/users", { headers })
      .then((response) => response.json())
      .then((data) => {
        setUserArr(data);
      });
  }, []);

  //validationg Email
  function dealEmail(e) {
    setEmail(e.target.value);
    if (regexEmail.test(email)) {
      console.log("good Email");
      setEmailOk(true);
    } else {
      setEmailOk(false);
    }
  }

  //navigating to userDashboard
  function nav() {
    navigate("/UserDashboard");
  }

  

  //handling the submission of form
  function handleSubmit(e) {
    e.preventDefault();

    if (emailOk) {
      for (var i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email === email && usersArr[i].password === password) {
          console.log("User Match");
          setSubmit(true);
          userFound=true
          
          break;
          
        }
      }

      if(userFound)
      {
            setTimeout(nav,1500);
      }



    } else {
      alert("The email format is not OK");
    }
  }

  return (
    <div className="container  mt-5">
      {/* If isSubmit true show success alert */}
      {isSubmit ? (
        <div
          className="alert alert-success text-success text-center"
          role="alert"
        >
          Login Successful
        </div>
      ) : null}
      {/* ////////////////////////////////////////////// */}
      <h1 className="text-primary">User Login</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="form-group">
          <label>
            <b>Email address:</b>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email address"
            required
            onBlur={(e) => {
              dealEmail(e);
            }}
            onBlurCapture={(e) => {
              dealEmail(e);
            }}
            onChange={(e) => {
              dealEmail(e);
            }}
          />
          {/* If email is invalid Error message  */}
          {!emailOk ? (
            <div
              className="alert alert-danger text-danger text-center"
              role="alert"
            >
              The email format is incorrect!!
            </div>
          ) : null}
        </div>
        {/* ////////////////////////////////////////////// */}
        <div className="form-group">
          <label>
            <b>Password:</b>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your email password"
            required
            minLength={3}
            maxLength={16}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br></br>
        <br></br>
      </form>
    </div>
  );
}

export default UserLogin;
