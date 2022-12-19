import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import emailjs from '@emailjs/browser';

function PostJOb() {
  //storing the posts
  var [postsArr, setPostsArr] = useState([]);
  ///////////////////////////////////////////////////////////////////

   //varaible to store the user preference data
   var [userPreferencesArr,setPreferencesArr] = useState([]);
   ///////////////////////////////////////////////////////////////////

  //UseEffect to fetch latest data in the posts database
  useEffect(() => {
    fetch("http://localhost:5000/posts", { "Content-Type": "application/json" })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
        console.log(data[0]);
      });
  }, []);
  ///////////////////////////////////////////////////////////////////
  //useeffect to fetch latest prefrences from database
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/userPreference", { headers })
      .then((response) => response.json())
      .then((data) => {
        setPreferencesArr(data);
      });
  }, []);
  ///////////////////////////////////////////////////////////////////

  //variables to store values from the form
  var role = "";
  var position = "";
  var location = "";
  ///////////////////////////////////////////////////////////////////

  //variable for navigating to another route
  var navigate = useNavigate();
  ///////////////////////////////////////////////////////////////////

  //variable to deal alertShow and unshow
  var [isSubmit, setIsSubmit] = useState(false);
  ///////////////////////////////////////////////////////////////////

 

  //function that hides the alert
  function hideAlert() {
    setIsSubmit(false);
  }
  ///////////////////////////////////////////////////////////////////

  //function matchUsersToPosts
  function matchUsersToPost() {
    console.log("inside match users to posts");

   

    console.log("role == " + role);
    console.log("position == " + position);
    console.log("location == " + location);

    console.log("User Preferences length = ", userPreferencesArr.length);

    for (var i = 0; i < userPreferencesArr.length; i++) {
      console.log("inside for loop");
      console.log("role == " + role);
      console.log("position == " + position);
      console.log("location == " + location);
      console.log("inside for loop");
      console.log(userPreferencesArr[i]);
      if (
        userPreferencesArr[i].role === role &&
        userPreferencesArr[i].position === position &&
        userPreferencesArr[i].location === location
      ) {
        console.log(i," MAtche present");
      }
    }
  }
  ///////////////////////////////////////////////////////////////////

  //function that handles the submit
  function handleSubmit(e) {
    //preventing the form from refreshing
    e.preventDefault();
    /////////////////////////////////////////////////////////////////

    //object that stores the post
    var postsObj = {
      id: "",
      hr_id: localStorage.getItem("hr_id"),
      role: document.getElementById("selectRole").value,
      position: document.getElementById("position").value,
      location: document.getElementById("location").value,
    };
    /////////////////////////////////////////////////////////////////
    //setting the value of role position and location in variables
    role = document.getElementById("selectRole").value;
    position = document.getElementById("position").value;
    location = document.getElementById("location").value;

    //setting the id of the post
    postsObj.id = postsArr.length + 1;
    /////////////////////////////////////////////////////////////////
    //displaying data in the post
    console.log(postsObj);
    /////////////////////////////////////////////////////////////////

    //Posting the data using fethc to database
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postsObj),
    })
      .then((response) => response.json())
      .then((info) => {
        console.log("Response from server" + info);
      });

    /////////////////////////////////////////////////////////////////

    //clearing the form
    document.getElementById("selectRole").value = "";
    document.getElementById("position").value = "";
    document.getElementById("location").value = "";
    /////////////////////////////////////////////////////////////////

    //Showing the alert
    setIsSubmit(true);
    /////////////////////////////////////////////////////////////////

    //updating the state of the posts array
    fetch("http://localhost:5000/posts", { "Content-Type": "application/json" })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
        console.log(data[0]);
      });
    /////////////////////////////////////////////////////////////////
    //hiding the alert after 2 seconds
    setTimeout(hideAlert, 2000);
    /////////////////////////////////////////////////////////////////

    matchUsersToPost();

    //navigate("/hrdashboard");
  }

  return (
    <div>
      {/* If isSubmit true show success alert */}
      {isSubmit ? (
        <div
          className="alert alert-success text-success text-center"
          role="alert"
        >
          Job Posted Successfully
        </div>
      ) : null}
      {/* ////////////////////////////////////////////// */}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="conatiner border border-secondary">
          <p className="text-center  fs-4 text-secondary">Details </p>
        </div>
        {/* /////////////////////////////////////////////////////////// */}

        {/* Professional details section */}
        <hr></hr>
        <div className="conatiner ">
          <div>
            <label>Select Role/Title:</label>
            <select
              className="form-select"
              id="selectRole"
              name="selectRole"
              required
            >
              <option></option>
              <option>Front End Developer</option>
              <option>Back End Developer</option>
            </select>

            <div className="mt-3">
              <div>
                <label>Select Position:</label>
                <select
                  className="form-select"
                  id="position"
                  name="selectPosition"
                  required
                >
                  <option></option>
                  <option>Beginner</option>
                  <option>Junior</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* /////////////////////////////////////////////////////////// */}
        <br></br>
        <hr></hr>
        <div className="conatiner ">
          <div>
            <div>
              <label>Select location:</label>
              <select
                className="form-select"
                id="location"
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
        <button
          id="buttonSubmit"
          className="btn btn-outline-success customSubmit"
          type="submit"
        >
          Submit
        </button>
        {/* ////////////////////////////////////////////// */}
      </form>
    </div>
  );
}

export default PostJOb;
