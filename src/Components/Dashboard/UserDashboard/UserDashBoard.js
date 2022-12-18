import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./UserDashBoard.css";

function UserDashboard() {
  var user = localStorage.getItem("username");
  var navigate = useNavigate();
  
  var [prefrencesArr, setUserPreferencesArr] = useState([]);

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/userPreference", { headers })
      .then((response) => response.json())
      .then((data) => {
        setUserPreferencesArr(data);
        console.log(prefrencesArr.length)
        for (var i = 0; i < data.length; i++) {
          if (data[i].user_id === localStorage.getItem("id")) {
            console.log("Preferences are found in the array");
            
            break;
          }
        }
      });
  }, []);

  return (
    <div className="container mt-2">
      <nav className="navbar  ">
        <div className="container-fluid">
          <p className="navbar-brand text-primary customP">
            <b>{user} Dashboard</b>
          </p>
          <form className="d-flex">
            <button
              className="btn btn-outline-primary mx-3"
              onClick={() => {
                navigate("/userprofile");
              }}
            >
              Preferences
            </button>
            <button
              className="btn btn-outline-primary custom"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
      <br></br>
      <div className="conatiner">
        <h4 className="text-primary text-center ">
          Jobs Matching Your Preferences Will Be Listed Here
        </h4>
      </div>
      <div class="container mt-3">
        <h2>Hover Rows</h2>
        <p>
          The .table-hover class enables a hover state (grey background on mouse
          over) on table rows:
        </p>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
            <tr>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@example.com</td>
            </tr>
            <tr>
              <td>July</td>
              <td>Dooley</td>
              <td>july@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDashboard;
