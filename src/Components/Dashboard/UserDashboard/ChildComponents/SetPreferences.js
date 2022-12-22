import { useEffect, useState } from "react";
import "./SetPreferences.css";

function UserPreferences({setSectionPreference,setSectionHeading}) {
  var [preferencesArr, setUserPreference] = useState([]);
  var userPreferenceObj = {
    id: "",
    user_id: "",
    user_name:localStorage.getItem("username"),
    role: "",
    position: "",
    location: "",
  };
  var [alreadyExist, setAlreadyExist] = useState(false);


  var [operation, setOperation] = useState("Added");
  

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/userPreference", { headers })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.length);
        console.log(localStorage.getItem("id"));
        setUserPreference(data);

        if (data.length > 0) {
          console.log("inside the dta lenght check");
          for (var i = 0; i < data.length; i++) {
            console.log(typeof data[i].user_id);
            if (data[i].user_id === localStorage.getItem("id").toString()) {
              console.log("User preferences already exist in data base");
              setAlreadyExist(true);
              userPreferenceObj.id=data[i].id;
              userPreferenceObj.user_id=data[i].user_id;
              userPreferenceObj.role=data[i].role;
              userPreferenceObj.position=data[i].position;
              userPreferenceObj.location=data[i].location;
              localStorage.setItem("preferenceID", data[i].id);

              document.getElementById("selectRole").value =
                userPreferenceObj.role;
              if (userPreferenceObj.role === "Back End Developer") {
                setBackEnd(true);
                setFrontEnd(false);
                document.getElementById("selectPositionBackend").value =
                  userPreferenceObj.position;
              } 
              if (userPreferenceObj.role === "Front End Developer") {
                setFrontEnd(true);
                setBackEnd(false);
                document.getElementById("selectPositionFrontend").value =
                  userPreferenceObj.position;
              }

              document.getElementById("selectLocation").value =
                userPreferenceObj.location;
            }
          }
        }
      });
  }, []);




  var [frontEnd, setFrontEnd] = useState(false);
  var [backEnd, setBackEnd] = useState(false);
  var [isSubmit, setIsSubmit] = useState(false);

  function dealSelectRole() {
    console.log("dealSelectRole Invoked");
    var selection = document.getElementById("selectRole").value;
    if (selection === "") {
      setFrontEnd(false);
      setBackEnd(false);
    } else if (selection === "Front End Developer") {
      setFrontEnd(true);
      setBackEnd(false);
    } else {
      setFrontEnd(false);
      setBackEnd(true);
    }
  }


  function handleSubmit(e) {
    e.preventDefault();

    if (alreadyExist) {
      setOperation("Updated")
      var position = "";
      if (frontEnd) {
        position = document.getElementById("selectPositionFrontend").value;
      }
      else{
        position = document.getElementById("selectPositionBackend").value;
      }
      console.log(userPreferenceObj.user_id);
      fetch(
        "http://localhost:5000/userPreference/" +
          localStorage.getItem("preferenceID"),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage.getItem("preferenceID"),
            user_id: localStorage.getItem("id").toString(),
            role: document.getElementById("selectRole").value,
            position: position,
            location: document.getElementById("selectLocation").value,
          }),
        }
      );
    } else {
      userPreferenceObj.id = preferencesArr.length + 1;

      userPreferenceObj.user_id = localStorage.getItem("id").toString();

      userPreferenceObj.role = document.getElementById("selectRole").value;

      if (userPreferenceObj.role === "Front End Developer") {
        console.log("Hurray FrontEnd Developer");
        userPreferenceObj.position = document.getElementById(
          "selectPositionFrontend"
        ).value;
        console.log(userPreferenceObj.position);
      } else {
        console.log("Hurray BackEnd Developer");
        userPreferenceObj.position = document.getElementById(
          "selectPositionBackend"
        ).value;
        console.log(userPreferenceObj.position);
      }

      userPreferenceObj.location =
        document.getElementById("selectLocation").value;
      console.log(userPreferenceObj.location);

      console.log(userPreferenceObj);

      fetch("http://localhost:5000/userPreference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPreferenceObj),
      })
        .then((response) => response.json())
        .then((info) => {
          console.log("Response from server" + info);
        });
    }

    setIsSubmit(true);
    setTimeout(handleDisplay,1500);
  }

  function handleDisplay(){
    setSectionHeading("Please select action");
    setSectionPreference(false);
  }

  return (
    <div className="container ">
   
      {/* If isSubmit true show success alert */}
      {isSubmit ? (
        <div
          className="alert alert-success text-success text-center"
          role="alert"
        >
          Preferences {operation} Successfully
        </div>
      ) : null}
      {/* ////////////////////////////////////////////// */}

      {/* personal details section */}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        

        {/* Professional details section */}
        <hr></hr>
        <div className="conatiner ">
          <div>
            <p className="text-secondary text-center">
              Professional Preference
            </p>

            <label>Select your role:</label>
            <select
              className="form-select"
              id="selectRole"
              name="selectRole"
              onChange={dealSelectRole}
              required
            >
              <option></option>
              <option>Front End Developer</option>
              <option>Back End Developer</option>
            </select>

            <div className="mt-3">
              {backEnd ? (
                <div>
                  <label>Select you position:</label>
                  <select
                    className="form-select"
                    id="selectPositionBackend"
                    name="selectExperience"
                    required
                  >
                    <option></option>
                    <option>Beginner</option>
                    <option>Junior</option>
                    <option>Senior</option>
                  </select>
                </div>
              ) : null}
              {frontEnd ? (
                <div>
                  <label>Select your position:</label>
                  <select
                    className="form-select"
                    id="selectPositionFrontend"
                    name="selectExperience"
                    required
                  >
                    <option></option>
                    <option>Beginner</option>
                    <option>Junior</option>
                    <option>Senior</option>
                  </select>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* /////////////////////////////////////////////////////////// */}
        <br></br>
        <hr></hr>
        <div className="conatiner ">
          <div>
            <p className="text-secondary text-center">Location Preference</p>

            <div>
              <label>Select your preferred location:</label>
              <select
                className="form-select"
                id="selectLocation"
                name="selectLocation"
                required
              >
                <option></option>
                <option>Lahore</option>
                <option>Karachi</option>
                <option>Islamabad</option>
              </select>
            </div>
          </div>
        </div>
        <br></br>
        {/* If isSubmit true show success alert */}
        {alreadyExist ? (
          <button
            id="buttonSubmit"
            className="btn btn-outline-primary customSubmit"
            type="submit"
          >
            Update
          </button>
        ) : (
          <button
            id="buttonSubmit"
            className="btn btn-outline-primary customSubmit"
            type="submit"
          >
            Submit
          </button>
        )}
        {/* ////////////////////////////////////////////// */}

        <button
          id="buttonSubmit"
          className="btn btn-outline-primary customSubmit mx-3"
          onClick={handleDisplay}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default UserPreferences;
