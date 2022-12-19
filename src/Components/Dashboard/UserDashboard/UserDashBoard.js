import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./UserDashBoard.css";

function UserDashboard() {
  //getting username from local storage
  var user = localStorage.getItem("username");
  ///////////////////////////////////////////////////////////////////

  //variable to navigate to the desired route
  var navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////

  //matches array to display data in table 
  var [matchesArr, setMatchesArr] = useState([]);
  ///////////////////////////////////////////////////////////////////

  var displayArr=[];

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        for(var i=0;i<data.length;i++)
        {
          if(data[i].user_id===localStorage.getItem("id"))
          {
            displayArr.push(data[i])
          }

        }
        setMatchesArr(displayArr);
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
        <h2>Jobs </h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Role</th>
              <th>Position</th>
              <th>Location</th>
              <th>Status </th>
            </tr>
          </thead>
          <tbody>
            {
              matchesArr.map(dataIn => {
                return <tr key={dataIn.id}>
                  <td>{dataIn.id}</td>
                  <td>{dataIn.id}</td>
                  <td>{dataIn.job_status}</td>
                </tr>
                
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDashboard;
