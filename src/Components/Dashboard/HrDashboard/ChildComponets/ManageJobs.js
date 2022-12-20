import { useEffect, useState } from "react";

function ManageJobs({ handleDisplay, sectionHeading }) {

  //variable to hold the value of the selected role
  var [valueOfChoice,setValueOfChoice] = useState("");
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
    setValueOfChoice (document.getElementById("selectRole").value)
    console.log("Value of choice = ",valueOfChoice)
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

  //function deal delete handles deletion operation
  function dealDelete(e)
  {
    let a = e.currentTarget.parentNode.parentNode.getAttribute("data-key");  
  console.log(a);

    console.log("id ye ha",a)

    fetch("http://localhost:5000/posts/" + a, {
      method: "DELETE",
    }).then((res) => {
      if (res.statusText === "Not Found") {
        alert("Please enter a valid id");
      } else {
      }
    }); // or res.json()

    const headers = { "Content-Type": "application/json" };
      fetch("http://localhost:5000/posts", { headers })
      .then((response) => response.json())
      .then((data) => {
        setPostsArr(data);
      });

   
      fetch("http://localhost:5000/matches", { headers })
      .then((response) => response.json())
      .then((data) => {

        console.log(data[0])
        for(var i=0;i<data.length;i++)
        {
          console.log("Inside for loop")
          console.log(" type of data[i] = ", typeof(data[i].post_id))
          console.log("data[i] = ",data[i].post_id )

          console.log(" type of a = ", typeof(a))
          console.log("value of a = ",a )



          if(data[i].post_id===parseInt(a))
          {
          console.log("Inside if")

            console.log("Data id to be patched" ,data[i].id)
            fetch("http://localhost:5000/matches/" + data[i].id, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "Job Deleted By HR",
              }),
            });
          }
        }
      });

    
 
  }
  ///////////////////////////////////////////////////////////////////


  return (
    <div>
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
          {valueOfChoice === "Front End Developer"  ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {postsArr.map((element)=>{
                      return((element.role===valueOfChoice)?
                      (<tr key={element.id} className="table-success" data-key={element.id}>
                      <td>{element.role}</td>
                      <td>{element.position}</td>
                      <td>{element.location}</td>
                      <td className="text-primary"><b>{element.status}</b></td>
                    
                      <td>
                        <button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e)=>{dealDelete(e)}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>):null
                    
                    )
                      
                   


                })}
              </tbody>
            </table>
          ) : null}
          {valueOfChoice === "Back End Developer"  ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {postsArr.map((element)=>{
                      return((element.role===valueOfChoice)?
                      (<tr key={element.id} className="table-success" data-key={element.id}>
                      <td>{element.role}</td>
                      <td>{element.position}</td>
                      <td>{element.location}</td>
                      <td>{element.status}</td>
                      <td >
                        <button
                          id="buttonSubmit"
                          className="btn btn-outline-success "
                          onClick={(e)=>{dealDelete(e)}}
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          id="buttonSubmit"
                          className="btn btn-outline-danger "
                          onClick={(e)=>{dealDelete(e)}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>):null
                    
                    )
                      
                   


                })}
              </tbody>
            </table>
          ) : null}
        </div>

        <button
          id="buttonSubmit"
          className="btn btn-outline-success customSubmit  mt-5"
          onClick={handleChanges}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ManageJobs;
