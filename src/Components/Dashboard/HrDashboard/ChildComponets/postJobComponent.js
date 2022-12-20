import { useState } from "react";
import { useEffect } from "react";
// import emailjs from '@emailjs/browser';

function PostJOb({ handleDisplay, sectionHeading }) {
  //storing the posts
  var [postsArr, setPostsArr] = useState([]);
  ///////////////////////////////////////////////////////////////////

  //variable to deal alertShow and unshow
  var [isSubmit, setIsSubmit] = useState(false);
  ///////////////////////////////////////////////////////////////////

  //function that hides the alert
  function hideAlert() {
    setIsSubmit(false);
  }
  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    //fetching the data of posts table from database
    fetch("http://localhost:5000/posts", { "Content-Type": "application/json" })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
      });
    /////////////////////////////////////////////////////////////////
  }, []);

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
      status: "Active",
    };
    /////////////////////////////////////////////////////////////////

    //setting the id of the postobj
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

    //fetching the data of posts table from database
    fetch("http://localhost:5000/posts", { "Content-Type": "application/json" })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
      });
    /////////////////////////////////////////////////////////////////

    makeMathces(postsObj);

    //hiding the alert after 2 seconds
    setTimeout(hideAlert, 1000);
    /////////////////////////////////////////////////////////////////
    setTimeout(handleChanges, 1000);
  }

  async function makeMathces(postsObj) {
    console.log("inside the match making function")
   
    fetch("http://localhost:5000/userPreference", { "Content-Type": "application/json" })
      .then((response) => response.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          if (
            data[i].role === postsObj.role &&
            data[i].position === postsObj.position &&
            data[i].location === postsObj.location
          ) {
            console.log("match found = ", i);
    
            let rand = Math.random() * 10000;
            console.log(rand); // say 99.81321410836433
    
            rand = Math.floor(rand); // 99
    
            var matchObj = {
              id: rand,
              post_id:data[i].id,
              user_name: "user"+data[i].user_id,
              user_id:data[i].user_id,
              user_email:"user"+data[i].user_id+"@gmail.com",
              hr_name:localStorage.getItem('username'),
              hr_id:localStorage.getItem('hr_id'),
              hr_email:"hr"+localStorage.getItem('hr_id')+"@gmail.com",
              role:postsObj.role,
              position:postsObj.position,
              location:postsObj.location,
              user_decision:null,
              interview_date:"to be decided by HR",
              user_feedback: "to be given after interview",
              HR_feedback: "to be given after interview",
              status:"Active"
            };

         

        
    
            //posting the match in match table
            fetch("http://localhost:5000/matches", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(matchObj),
            })
              .then((response) => response.json())
              .then((info) => {
                console.log("Response from server" + info);
              });
          }
        }
       

        
      });

      
    
  }

  function handleChanges() {
    handleDisplay(false);
    sectionHeading("Please select action ");
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
        <button
          id="buttonSubmit"
          className="btn btn-outline-success customSubmit mx-3"
          onClick={handleChanges}
        >
          Cancel
        </button>
        {/* ////////////////////////////////////////////// */}
      </form>
    </div>
  );
}

export default PostJOb;
