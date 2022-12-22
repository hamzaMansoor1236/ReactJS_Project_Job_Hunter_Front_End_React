import { useEffect } from "react";
import { useState } from "react";

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

  //function that deals the deletion of the job request
  function dealReject(e) {
    let a = e.currentTarget.parentNode.parentNode.parentNode.getAttribute("data-key");
    console.log("value of a = ",a);
    fetch("http://localhost:5000/matches/" + a, {
      method: "DELETE",
    }).then((res) => {
      if (res.statusText === "Not Found") {
        alert("Please enter a valid id");
      } else {
      }
    }); // or res.json()

    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        setMatchesArr(data);
      });
  }
  ///////////////////////////////////////////////////////////////////

  //function deals the accept button click
  function dealAccept(e) {
    let a = e.currentTarget.parentNode.parentNode.getAttribute("data-key");
    console.log(a);

    fetch("http://localhost:5000/matches/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_decision: true,
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
      <div>
        {matchesArr.length > 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Role</th>
                <th>Position</th>
                <th>Location</th>
                <th>Status</th>
                <th>Organization</th>
                <th>Decision</th>
                <th>Reject</th>
                <th>interview_date</th>
                <th>feedback</th>
              </tr>
            </thead>
            <tbody>
              {matchesArr.map((element) => {
                return element.user_id === localStorage.getItem("id") ? (
                  <tr
                    key={element.id}
                    className="table-success"
                    data-key={element.id}
                  >
                    <td>{element.role}</td>
                    <td>{element.position}</td>
                    <td>{element.location}</td>
                    <td>
                      {element.status === "Active" ? (
                        <p className="text-primary">
                          <b>{element.status}</b>
                        </p>
                      ) : (
                        <p className="text-danger">
                          <b>{element.status}</b>
                        </p>
                      )}
                    </td>

                    <td>{element.hr_email}</td>

                    <td>
                      {(element.user_decision === null && element.status==="Active")  ? (
                        <button
                          id="buttonSubmit"
                          className="btn btn-outline-success "
                          onClick={(e) => {
                            dealAccept(e);
                          }}
                        >
                          Accept
                        </button>
                      ) : (
                       null
                      )}
                          {(element.user_decision === true && element.status==="Active")  ? (
                       <p className="text-success">
                       <b>Accepted</b>
                     </p>
                      ) : (
                        null
                      )}
                        {(element.user_decision === false && element.status==="Active")  ? (
                       <p className="text-success">
                       <b className="text-danger">You rejected the offer</b>
                     </p>
                      ) : (
                        null
                      )}
                    </td>
                    <td>
                      {(element.user_decision === null && element.status==="Active") ? (
                        <button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e) => {
                            dealReject(e);
                          }}
                        >
                          reject
                        </button>
                      ) : null}
                         {element.status === "Job Deleted By HR" ? (
                        <button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e) => {
                            dealReject(e);
                          }}
                        >
                          Remove
                        </button>
                      ) : null}
                      {(element.user_decision === false && element.status==="Active")  ? (
                       <p className="text-success">
                        <button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e) => {
                            dealReject(e);
                          }}
                        >
                          Delete
                        </button>
                     </p>
                      ) : (
                        null
                      )}
                     
                    </td>
                    <td>{element.interview_date}</td>
                    <td>{element.HR_feedback}</td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        ) : (
          <p>No notifications</p>
        )}
      </div>

      <button
        id="buttonSubmit"
        className="btn btn-outline-primary customSubmit "
        onClick={handleDisplay}
      >
        Back
      </button>
    </div>
  );
}

export default JobAlerts;
