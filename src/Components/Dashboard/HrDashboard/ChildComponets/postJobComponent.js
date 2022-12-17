import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostJOb(){

    var navigate=useNavigate();
    var [isSubmit,setIsSubmit]=useState(false);
    function handleSubmit(e){
        e.preventDefault();


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