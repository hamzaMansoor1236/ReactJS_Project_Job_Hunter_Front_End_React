//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserSignUp() {
  //object to store user data
  const user = {
    id: "",
    user_name: "",
    email: "",
    password: "",
  };
  ///////////////////////////////////////////////////////////////////

  //for navigation
  const navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////

  //Commented as no more required
  // useEffect(() => {
  //   //fetching the last id in the database
  //   const headers = { "Content-Type": "application/json" };
  //   fetch("http://localhost:5000/users", { headers })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       document.getElementById("id").value = (parseInt((data[data.length -1 ].id))+1);
  //     });
  // }, []);
  ///////////////////////////////////////////////////////////////////

  //function to create entry in the database
  function Create() {
    //generating random number
    let rand = Math.random() * 10000;
    console.log(rand); // say 99.81321410836433
    rand = Math.floor(rand); // 99
    ///////////////////////////////////////////////////////////////////

    //setting the values in the object
    user.id = rand;
    user.user_name = document.getElementById("naam").value;
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;
    ///////////////////////////////////////////////////////////////////

    //check for null and Posting in database
    if (user.user_name && user.email && user.password) {
      //posting data into database
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((info) => {
          console.log("Response from server" + info);
        });
      alert("Sign Up Successful");
      navigate("/");
    } else {
      alert("Please fill the fields");
    }
    ///////////////////////////////////////////////////////////////////
  }
  ///////////////////////////////////////////////////////////////////

  return (
    <div className="container mt-5 ">
      <h1 className="text-primary">User Sign Up</h1>

      <form onSubmit={Create}>
        <div>
          <label>
            <b className="text-primary" hidden={true}>
              ID
            </b>{" "}
          </label>
          <input
            type="number"
            className="form-control"
            id="id"
            disabled
            hidden={true}
          />
        </div>
        <div>
          <label>
            <b className="text-primary">Username</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="naam"
            placeholder="Enter Username"
            required
          />
        </div>
        <br></br>
        <div>
          <label>
            <b className="text-primary">Email address</b>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <br></br>

        <div>
          <label>
            <b className="text-primary">Password</b>
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

        <br></br>
        <div>
          <button type="submit" className="btn btn-outline-primary custom">
            Sign Up
          </button>

          <button
            className="btn btn-outline-primary mx-3 custom"
            onClick={() => {
              navigate("/userlogin");
            }}
          >
            Login
          </button>
        </div>
        <br></br>
      </form>
    </div>
  );
}

export default UserSignUp;
