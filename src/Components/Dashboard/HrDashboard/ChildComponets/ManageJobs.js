import { useEffect, useState } from "react";

function ManageJobs({ handleDisplay, sectionHeading }) {
  //variable to hold the value of the selected role
  var [valueOfChoice, setValueOfChoice] = useState("");
  ///////////////////////////////////////////////////////////////////

  //variable to stores job present in database
  var [postsArr, setPostsArr] = useState([]);
  ///////////////////////////////////////////////////////////////////

  //useeffect to get all the job postings
  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/posts", { headers })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
      });
  }, []);
  ///////////////////////////////////////////////////////////////////

  //function that invokes on the selection of roles
  function roleSelection() {
    console.log("funciton role selection running");
    setValueOfChoice(document.getElementById("selectRole").value);
    console.log("Value of choice = ", valueOfChoice);
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/posts", { headers })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
      });
  }
  ///////////////////////////////////////////////////////////////////

  //function that hides the component on the back button press
  function handleChanges() {
    handleDisplay(false);
    sectionHeading("Please select action ");
  }
  ///////////////////////////////////////////////////////////////////

  //function that deals the delete button
  async function dealDeleteButton(e){
    //getting the post id in the database
    let a = e.currentTarget.parentNode.parentNode.getAttribute("data-key");
    console.log(a);
    console.log("id ye ha", a);
    console.log("Type of a = ",typeof(a))
    /////////////////////////////////////////////////////////////////

    //patching the delete by hr true
    fetch("http://localhost:5000/posts/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deleted_by_hr: true,
      })
    })

    // //updating the state to show effect to the user after deletion
    
    fetch("http://localhost:5000/posts", { "Content-Type": "application/json" })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
      });
    /////////////////////////////////////////////////////////////////








    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {
        for(var i=0;i<data.length;i++)
        {
            if(data[i].post_id===parseInt(a))
            {
              fetch("http://localhost:5000/matches/" + data[i].id, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  deleted_by_hr: true,
                })
              })

            }
        }
      });
      

  }
  ///////////////////////////////////////////////////////////////////



  //function deal delete handles deletion operation
  function dealDeactiveButton(e) {
    //getting the post id in the database
    let a = e.currentTarget.parentNode.parentNode.getAttribute("data-key");
    console.log(a);
    console.log("id ye ha", a);
    /////////////////////////////////////////////////////////////////

    


    //Updating status to deactive of post with id a in Posts table
    fetch("http://localhost:5000/posts/" + a, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Deactive",
      })
    })


    // fetch("http://localhost:5000/posts/" + a, {
    //   method: "DELETE",
    // }).then((res) => {
    //   if (res.statusText === "Not Found") {
    //     alert("Please enter a valid id");
    //   } else {
    //   }
    // });
    /////////////////////////////////////////////////////////////////

    //updating the state to show effect to the user after deletion
    const headers = { "Content-Type": "application/json" };
    fetch("http://localhost:5000/posts", { headers })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
      });
    /////////////////////////////////////////////////////////////////

      //fetching the matches record and updating the status 
      fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {

        
         console.table(data[0])
        for(var i=0;i<data.length;i++)
        {
          console.log("Inside for loop")
          console.log(" type of data[i] = ", typeof(data[i].post_id))
          console.log("data[i] = ",data[i].post_id )

          console.log(" type of a = ", typeof(a))
          console.log("value of a = ",a )

          if(data[i].post_id===parseInt(a))
          {
          console.log("Insideeeeeeeeeeeeeeeeee if")

            console.log("Data id to be patched" ,data[i].id)
            fetch("http://localhost:5000/matches/" + data[i].id, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status_by_hr: false,
              }),
            });
          }
        }
      });
  }
  ///////////////////////////////////////////////////////////////////

  return (
    <div>
      <button
          id="buttonSubmit"
          className="btn btn-outline-success customSubmit  mb-2"
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
        <div>
          {valueOfChoice === "Front End Developer" ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Role</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {postsArr.map((element) => {
                  return ((element.role === valueOfChoice) && (element.deleted_by_hr==null)) ? (
                    <tr
                      key={element.id}
                      className="table-success"
                      data-key={element.id}
                    >
                     
                      <td><b>{element.id}</b></td>
                      <td>{element.role}</td>
                      <td>{element.position}</td>
                      <td>{element.location}</td>
                      {/* if status active show blue text else red text */}

                      <td>
                      {element.status==="Active"?(<p className="text-primary">
                        <b>{element.status}</b>
                      </p>):(<p className="text-danger">
                        <b>{element.status}</b>
                      </p>)}
                      </td>
                      {/* If status Active Shoe deactivate button else show delete Button */}
                      <td>
                        {element.status==="Active"?(  <button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e) => {
                            dealDeactiveButton(e);
                          }}
                        >
                          Deactivate
                        </button>):(<button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e) => {
                            dealDeleteButton(e);
                          }}
                        >
                          Delete
                        </button>)}
                      
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          ) : null}
         {valueOfChoice === "Back End Developer"  ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Role</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {postsArr.map((element) => {
                  return ((element.role === valueOfChoice) && (element.deleted_by_hr==null))? (
                    <tr
                      key={element.id}
                      className="table-success"
                      data-key={element.id}
                    >
                     
                      <td><b>{element.id}</b></td>
                      <td>{element.role}</td>
                      <td>{element.position}</td>
                      <td>{element.location}</td>
                      {/* if status active show blue text else red text */}

                      <td>
                      {element.status==="Active"?(<p className="text-primary">
                        <b>{element.status}</b>
                      </p>):(<p className="text-danger">
                        <b>{element.status}</b>
                      </p>)}
                      </td>
                      {/* If status Active Shoe deactivate button else show delete Button */}
                      <td>
                        {element.status==="Active"?(  <button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e) => {
                            dealDeactiveButton(e);
                          }}
                        >
                          Deactivate
                        </button>):(<button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e) => {
                            dealDeleteButton(e);
                          }}
                        >
                          Delete
                        </button>)}
                      
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          ) : null}
        </div>

        
      </div>
    </div>
  );
}

export default ManageJobs;
