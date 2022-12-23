import { useEffect } from "react";
import { useState } from "react";
import "../ChildComponents/JobAlerts.css";

function JobAlerts({ setSectionJobAlerts, setSectionHeading }) {
  //variable to stores job present in database
  var [matchesArr, setMatchesArr] = useState([]);
  ///////////////////////////////////////////////////////////////////

  //useeffect to get all the matches
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        setMatchesArr(data);
      });
  }, []);
  ///////////////////////////////////////////////////////////////////

  //function that deal the hiding of the component
  function handleDisplay() {
    setSectionHeading("Please select action");
    setSectionJobAlerts(false);
  }
  ///////////////////////////////////////////////////////////////////

    //function deals the accept button click
    function dealAccept(e) {
      let a = e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
      console.log(a);
  
  
      fetch("http://localhost:5000/matches/" + a, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status_by_user: true,
        }),
      });
  
      const headers = { "Content-Type": "application/json" };
      fetch("http://localhost:5000/matches", { headers })
        .then((response) => response.json())
        .then((data) => {
          setMatchesArr(data);
        });
    }
    /////////////////////////////////////////////////////////////////

  //function that deals the deletion of the job request
  function dealReject(e) {
    let a =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
    console.log("value of a = ", a);
   
    fetch("http://localhost:5000/matches/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status_by_user: false,
      }),
    });

    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        setMatchesArr(data);
      });
  }
  ///////////////////////////////////////////////////////////////////



  return (
    <div>
      <button
        id="buttonSubmit"
        className="btn btn-outline-primary custom mb-2"
        onClick={handleDisplay}
      >
        Back
      </button>
      {matchesArr.length > 0 ? (
        <div className="spacing">
          {matchesArr.map((element) => {
            return (
              <div>
                {element.status_by_hr === true ? (
                  <div key={element.id}>
                    <div className="card style me-4" data-key={element.id}>
                      <div className="card-body">
                        <h6 className="card-title">
                          Tracking ID : {element.post_id}{" "}
                        </h6>
                        <h6 className="card-title">{element.role}</h6>

                        <h6 className="card-text col-6">{element.position}</h6>
                        <h6 className="card-text col-6">{element.location}</h6>
                        {/* Status active or deactive by HR */}
                        {element.status_by_hr === true ? (
                          <p>
                            <b>Status:</b>{" "}
                            <span className="text-primary">
                              <b>Active</b>
                            </span>
                          </p>
                        ) : null}

                        {/*  Accepting or rejecting the job*/}
                        {element.status_by_hr === true&&element.status_by_user === null ? (
                          <div>
                            <button className="btn btn-outline-primary custom" onClick={(e)=>{dealAccept(e)}}>
                              Accept
                            </button>
                            <button className="btn btn-outline-danger mx-3 custom" onClick={(e)=>{dealReject(e)}}>
                              reject
                            </button>
                          </div>
                        ) : null}
                        {/* ///////////////////////////////////// */}
                        {/* Displaying the interview date notified soon */}
                        { element.status_by_user===true && element.interview_date===""? (
                          <div>
                            <p>
                            <b>Interview Date:</b>{" "}
                            <span className="text-primary">
                              <b>Will Be Notified Soon by HR</b>
                            </span>
                          </p>
                          </div>
                        ) : null}
                       {/* /////////////////////////////////////////////////////////////////////// */}
                        {/* Displaying the interview date on accepting the interview */}
                        { element.interview_date!=="" && element.interview_status===false? (
                          <div>
                            <p>
                            <b>Interview Date:</b>{" "}
                            <span className="text-primary">
                              <b>{element.interview_date}</b>
                            </span>
                          </p>
                          </div>
                        ) : null}
                       {/* /////////////////////////////////////////////////////////////////////// */}
                       {/* Displaying the interview status */}
                       { element.interview_status===true  && element.selection_status===null? (
                          <div>
                            <p>
                            
                            <span className="text-primary">
                              <b>Interview Result Awaited</b>
                            </span>
                          </p>
                          </div>
                        ) : null}
                       {/* /////////////////////////////////////////////////////////////////////// */}

                        {/* Displaying the interview status */}
                        { element.selection_status===true ? (
                          <div>
                            <h3 className="text-success">Congratulation</h3>
                            <p>
                            <b className="text-success"> You Have Passed the Interview</b>{" "}
                          
                          </p>
                          </div>
                        ) : null}
                       {/* /////////////////////////////////////////////////////////////////////// */}
                         {/* Displaying the interview status */}
                         { element.selection_status===false ? (
                          <div>
                            
                            <p><b className="text-danger">Sorry</b>
                            <b className="text-primary"> You could not pass the interview </b>{" "}
                            
                            feedback will be shared soon
                          
                          </p>
                          </div>
                        ) : null}
                       {/* /////////////////////////////////////////////////////////////////////// */}
                        {/* Displaying the interview status */}
                        { element.interview_feedback!=="to be given after interview" ? (
                          <div>
                            <label>Feedback:</label>
                            
                              <p>{element.interview_feedback}</p>
                         
                                
                          </div>
                        ) : null}
                       {/* /////////////////////////////////////////////////////////////////////// */}


                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <h6>
          <b>No Job Notifications </b>
        </h6>
      )}
    </div>
  );
}

export default JobAlerts;
