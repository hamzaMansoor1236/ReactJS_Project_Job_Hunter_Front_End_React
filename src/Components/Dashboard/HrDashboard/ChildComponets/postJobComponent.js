import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PostJOb(){

  var [postsArr,setPostsArr]=useState([]);

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/posts", { headers })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
      });
  }, []);

    

    var navigate=useNavigate();
    var [isSubmit,setIsSubmit]=useState(false);

    function hideAlert(){
      setIsSubmit(false);
    }
    function handleSubmit(e){
        e.preventDefault();

        var postsObj= {
              // "id": 1,
        // "hr_id": "1",
        // "role": "Front End Developer",
        // "position": "Beginner",
        // "location": "Karachi"

          id:((postsArr.length)+1),
          hr_id:localStorage.getItem("hr_id"),
          role:document.getElementById("selectRole").value,
          position:document.getElementById("position").value,
          location:document.getElementById("location").value

        }

        console.log(postsObj);

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
      
      document.getElementById("selectRole").value="";
      document.getElementById("position").value="";
      document.getElementById("location").value="";

      setIsSubmit(true);
      setTimeout(hideAlert,2000);



      navigate("/hrdashboard");

    
    }

    return(
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

        
      </form></div>
    )
}

export default PostJOb;