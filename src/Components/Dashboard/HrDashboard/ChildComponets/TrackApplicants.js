import { useEffect } from "react";
import { useState } from "react";
import "../ChildComponets/TrackApplicants.css";

function TrackApplicants({ handleDisplay, sectionHeading }) {
  //variable to hold the value of the selected role
  var [valueOfChoice, setValueOfChoice] = useState("");
  ///////////////////////////////////////////////////////////////////

  //variable to stores job present in database
  var [matchesArr, setMatchesArr] = useState([]);
  ///////////////////////////////////////////////////////////////////

  //useeffect to get all the job postings
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        setMatchesArr(data);
      });
  }, []);
  ///////////////////////////////////////////////////////////////////

  //function that hides the component on the back button press
  function handleChanges() {
    handleDisplay(false);
    sectionHeading("Please select action ");
  }
  ///////////////////////////////////////////////////////////////////
  //function that invokes on the selection of roles
  function roleSelection() {
    console.log("funciton role selection running");
    setValueOfChoice(document.getElementById("selectRole").value);
    console.log("Value of choice = ", valueOfChoice);
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        setMatchesArr(data);
      });
  }
  ///////////////////////////////////////////////////////////////////

  //Removes the job from the cards list
  function removeFromList(e) {
    let a = e.currentTarget.parentNode.parentNode.getAttribute("data-key");
    console.log("value of a = ", a);
    fetch("http://localhost:5000/matches/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delete_by_hr: true,
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
  //function that is invoked on the schedule interview button click
  function ScheduleInterview(e) {
    e.preventDefault();
    let a =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
    console.log("value of a = ", a);

    console.log(
      "Value of inerview date ",
      document.getElementById("interview_date").value
    );

    console.log(typeof document.getElementById("interview_date").value);

    var interview_date = document.getElementById("interview_date").value;

    fetch("http://localhost:5000/matches/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interview_date: interview_date,
        interview_status: false,
      }),
    });
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        setMatchesArr(data);
      });
  }
  //function that is invoked on mark conducted button
  function markConducted(e) {
    let a =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
    console.log("value of a = ", a);
    fetch("http://localhost:5000/matches/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interview_status: true,
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
  function markPassed(e, action) {
    let a =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
    console.log("value of a = ", a);
    if (action === "pass") {
      console.log("if part", action);
      fetch("http://localhost:5000/matches/" + a, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selection_status: true,
        }),
      });
      const headers = { "Content-Type": "application/json" };
      fetch("http://localhost:5000/matches", { headers })
        .then((response) => response.json())
        .then((data) => {
          setMatchesArr(data);
        });
    } else {
      console.log("Else part", action);
      fetch("http://localhost:5000/matches/" + a, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selection_status: false,
        }),
      });
      const headers = { "Content-Type": "application/json" };
      fetch("http://localhost:5000/matches", { headers })
        .then((response) => response.json())
        .then((data) => {
          setMatchesArr(data);
        });
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  function interviewDone(e) {
    let a =
      e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
    console.log("value of a = ", a);
    fetch("http://localhost:5000/matches/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
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
  function feedback(e) {
    let a =
      e.currentTarget.parentNode.parentNode.parentNode.parentNode.getAttribute("data-key");
    console.log("value of a = ", a);

    var feedback = document.getElementById("feedback").value;
    fetch("http://localhost:5000/matches/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interview_feedback: feedback,
      }),
    });
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        setMatchesArr(data);
      });
  }
  //function that removes the entry from the cards list
  function removeAfterInterviewFailed(e)
  {
    let a =
    e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
  console.log("value of a = ", a);
 
    fetch("http://localhost:5000/matches/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    });
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        setMatchesArr(data);
      });

  }
  return (
    <div>
      <button
        id="buttonSubmit"
        className="btn btn-outline-success custom mb-2"
        onClick={handleChanges}
      >
        Back
      </button>
      <div>
        {/* Role selection box */}
        <label>Select Role/Title:</label>
        <select
          className="form-select"
          id="selectRole"
          name="selectRole"
          onChange={roleSelection}
        >
          <option></option>
          <option>Front End Developer</option>
          <option>Back End Developer</option>
        </select>
        {/* ///////////////////////////////////////////////////////// */}
        <br></br>
        <div className="spacing">
          {valueOfChoice === "Front End Developer" ? (
            <div>
              {matchesArr.map((element) => {
                return element.role === valueOfChoice &&
                  element.delete_by_hr === null &&
                  element.completed === null ? (
                  <div key={element.id}>
                    <div className="card style me-4" data-key={element.id}>
                      <div className="card-body">
                        <h6 className="card-title">
                          Tracking ID : {element.post_id}{" "}
                        </h6>
                        <h6 className="card-title">{element.role}</h6>

                        <h6 className="card-text col-6">{element.position}</h6>
                        <h6 className="card-text col-6">{element.location}</h6>
                        {element.status_by_user === null ? (
                          <p>
                            <b>Status:</b>{" "}
                            <span className="text-primary">
                              <b>Pending user approval</b>
                            </span>
                          </p>
                        ) : null}
                        {element.status_by_user === true &&
                        element.interview_date === "" ? (
                          <p>
                            <b>Status:</b>{" "}
                            <span className="text-success">
                              <b>Accepted by User</b>
                            </span>
                          </p>
                        ) : null}
                        {element.status_by_user === false ? (
                          <p>
                            <b>Status:</b>{" "}
                            <span className="text-danger">
                              <b>User uninterested</b>
                            </span>
                          </p>
                        ) : null}
                        {element.status_by_user === false ? (
                          <button
                            className="btn btn-outline-danger"
                            onClick={(e) => {
                              removeFromList(e);
                            }}
                          >
                            {" "}
                            Remove{" "}
                          </button>
                        ) : null}
                        {element.status_by_user === true &&
                        element.interview_date === "" ? (
                          <form>
                            <div className="form-group">
                              <label>Interview Date:</label>
                              <input
                                type="date"
                                className="form-control"
                                id="interview_date"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-outline-primary mt-2"
                              onClick={(e) => {
                                ScheduleInterview(e);
                              }}
                            >
                              {" "}
                              Schedule Interview{" "}
                            </button>
                          </form>
                        ) : null}
                        {element.interview_date !== "" &&
                        (element.interview_status === false ||
                          element.interview_status === null) ? (
                          <p>
                            <b className="me-2">Interview Date :</b>
                            <b className="text-primary">
                              {element.interview_date}
                            </b>
                          </p>
                        ) : null}
                        {element.interview_status === false ? (
                          <div>
                            <p>
                              <b>Interview Status :</b>
                              <b className="text-primary">
                                Interview Scheduled
                              </b>
                            </p>
                            <button
                              className="btn btn-outline-success mt-2"
                              onClick={(e) => {
                                markConducted(e);
                              }}
                            >
                              Mark Conducted
                            </button>
                          </div>
                        ) : null}
                        {element.interview_status === true &&
                        element.selection_status === null ? (
                          <div>
                            <p>
                              <b>Interview Status :</b>
                              <b className="text-primary">
                                Interview conducted
                              </b>
                            </p>
                          </div>
                        ) : null}

                        {element.interview_status === true &&
                        element.selection_status === null ? (
                          <div>
                            <button
                              className="btn btn-outline-success mt-2"
                              onClick={(e) => {
                                markPassed(e, "pass");
                              }}
                            >
                              Passed
                            </button>
                            <button
                              className="btn btn-outline-danger mt-2 ms-4"
                              onClick={(e) => {
                                markPassed(e, "fail");
                              }}
                            >
                              Failed
                            </button>
                          </div>
                        ) : null}
                        {element.selection_status === true ? (
                          <div className="text-center">
                            <h6 className="text-success">
                              <b>Candidate Selected</b>
                            </h6>
                            <p>
                              <b>Name : {element.user_name} </b>
                            </p>
                            <p>
                              <b>Email : {element.user_email} </b>
                            </p>
                            <button
                              className="btn btn-outline-primary"
                              onClick={(e) => {
                                interviewDone(e);
                              }}
                            >
                              Mark Complete
                            </button>
                          </div>
                        ) : null}

                        {element.selection_status === false &&
                        element.interview_feedback ===
                          "to be given after interview" ? (
                          <div>
                            <h6 className="text-center text-danger">
                              <b>Candidate Rejected</b>
                            </h6>
                            <form>
                              <div className="form-group">
                                <label>Feedback:</label>
                                <textarea
                                  className="form-control"
                                  rows="5"
                                  id="feedback"
                                  required
                                ></textarea>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-outline-success mt-3"
                                onClick={(e) => {
                                  feedback(e);
                                }}
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        ) : null}
                        {element.selection_status === false &&
                        element.interview_feedback !==
                          "to be given after interview" ? (
                          <div>
                               <button
                            className="btn btn-outline-danger"
                            onClick={(e) => {
                              removeAfterInterviewFailed(e);
                            }}
                          >
                            {" "}
                            Remove{" "}
                          </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          ) : null}
          {valueOfChoice === "Back End Developer" ? (
            <div>
              {matchesArr.map((element) => {
                return element.role === valueOfChoice &&
                  element.delete_by_hr === null &&
                  element.completed === null ? (
                  <div key={element.id}>
                    <div className="card style me-4" data-key={element.id}>
                      <div className="card-body">
                        <h6 className="card-title">
                          Tracking ID : {element.post_id}{" "}
                        </h6>
                        <h6 className="card-title">{element.role}</h6>

                        <h6 className="card-text col-6">{element.position}</h6>
                        <h6 className="card-text col-6">{element.location}</h6>
                        {element.status_by_user === null ? (
                          <p>
                            <b>Status:</b>{" "}
                            <span className="text-primary">
                              <b>Pending user approval</b>
                            </span>
                          </p>
                        ) : null}
                        {element.status_by_user === true &&
                        element.interview_date === "" ? (
                          <p>
                            <b>Status:</b>{" "}
                            <span className="text-success">
                              <b>Accepted by User</b>
                            </span>
                          </p>
                        ) : null}
                        {element.status_by_user === false ? (
                          <p>
                            <b>Status:</b>{" "}
                            <span className="text-danger">
                              <b>User uninterested</b>
                            </span>
                          </p>
                        ) : null}
                        {element.status_by_user === false ? (
                          <button
                            className="btn btn-outline-danger"
                            onClick={(e) => {
                              removeFromList(e);
                            }}
                          >
                            {" "}
                            Remove{" "}
                          </button>
                        ) : null}
                        {element.status_by_user === true &&
                        element.interview_date === "" ? (
                          <form>
                            <div className="form-group">
                              <label>Interview Date:</label>
                              <input
                                type="date"
                                className="form-control"
                                id="interview_date"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-outline-primary mt-2"
                              onClick={(e) => {
                                ScheduleInterview(e);
                              }}
                            >
                              {" "}
                              Schedule Interview{" "}
                            </button>
                          </form>
                        ) : null}
                        {element.interview_date !== "" &&
                        (element.interview_status === false ||
                          element.interview_status === null) ? (
                          <p>
                            <b className="me-2">Interview Date :</b>
                            <b className="text-primary">
                              {element.interview_date}
                            </b>
                          </p>
                        ) : null}
                        {element.interview_status === false ? (
                          <div>
                            <p>
                              <b>Interview Status :</b>
                              <b className="text-primary">
                                Interview Scheduled
                              </b>
                            </p>
                            <button
                              className="btn btn-outline-success mt-2"
                              onClick={(e) => {
                                markConducted(e);
                              }}
                            >
                              Mark Conducted
                            </button>
                          </div>
                        ) : null}
                        {element.interview_status === true &&
                        element.selection_status === null ? (
                          <div>
                            <p>
                              <b>Interview Status :</b>
                              <b className="text-primary">
                                Interview conducted
                              </b>
                            </p>
                          </div>
                        ) : null}

                        {element.interview_status === true &&
                        element.selection_status === null ? (
                          <div>
                            <button
                              className="btn btn-outline-success mt-2"
                              onClick={(e) => {
                                markPassed(e, "pass");
                              }}
                            >
                              Passed
                            </button>
                            <button
                              className="btn btn-outline-danger mt-2 ms-4"
                              onClick={(e) => {
                                markPassed(e, "fail");
                              }}
                            >
                              Failed
                            </button>
                          </div>
                        ) : null}
                        {element.selection_status === true ? (
                          <div className="text-center">
                            <h6 className="text-success">
                              <b>Candidate Selected</b>
                            </h6>
                            <p>
                              <b>Name : {element.user_name} </b>
                            </p>
                            <p>
                              <b>Email : {element.user_email} </b>
                            </p>
                            <button
                              className="btn btn-outline-primary"
                              onClick={(e) => {
                                interviewDone(e);
                              }}
                            >
                              Mark Complete
                            </button>
                          </div>
                        ) : null}

                        {element.selection_status === false &&
                        element.interview_feedback ===
                          "to be given after interview" ? (
                          <div>
                            <h6 className="text-center text-danger">
                              <b>Candidate Rejected</b>
                            </h6>
                            <form>
                              <div className="form-group">
                                <label>Feedback:</label>
                                <textarea
                                  className="form-control"
                                  rows="5"
                                  id="feedback"
                                  required
                                ></textarea>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-outline-success mt-3"
                                onClick={(e) => {
                                  feedback(e);
                                }}
                              >
                                Submit 
                              </button>
                            </form>
                          </div>
                        ) : null}
                        {element.selection_status === false &&
                        element.interview_feedback !==
                          "to be given after interview" ? (
                          <div>
                               <button
                            className="btn btn-outline-danger"
                            onClick={(e) => {
                              removeAfterInterviewFailed(e);
                            }}
                          >
                            {" "}
                            Remove{" "}
                          </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TrackApplicants;
