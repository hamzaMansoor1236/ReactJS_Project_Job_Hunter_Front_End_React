import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HrDashboard.css";
import PostJOb from "./ChildComponets/postJobComponent";

function HRDashboard() {
  var navigate = useNavigate();
  var [home, setHome] = useState(false);
  var [news, setNews] = useState(false);
  var [sectionHeading, setSectionHeading] = useState("Please select action from side bar");
  var [posted,setPosted]=useState(false);

  function dealHome() {
    setHome(true);
    setNews(false);
    setSectionHeading("Post Job");
  }
  function dealNews() {
    setHome(false);
    setNews(true);
    setSectionHeading("News");
  }
 

  return (
    <div className=" mt-1">
      <nav className="navbar  ">
        <div className="container-fluid">
          <p className="navbar-brand text-success customP">
            <b> Dashboard</b>
          </p>
          <form className="d-flex">
            <button
              className="btn btn-outline-success custom"
              onClick={() => {
                localStorage.clear();
                navigate("/hrLogin");
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>

      <div className="conatiner">
        <div className="sidebar">
          <a className="border " href="#home" onClick={dealHome}>
            Post Job
          </a>
          <a className="border " href="#news" onClick={dealNews}>
            News
          </a>
          <a className="border " href="#contact">
            Contact
          </a>
          <a className="border " href="#about">
            About
          </a>
        </div>

        <div className="content border border bg-light">
          <div>
            {" "}
            <h4 className="text-success ">{sectionHeading}</h4>
          </div>

          {home ? (
            <div>
            <PostJOb></PostJOb>
              {/* If isSubmit true show success alert */}
              {posted ? (
                <div
                  className="alert alert-success text-success text-center"
                  role="alert"
                >
                  Preference Added Successfully
                </div>
              ) : null}
              {/* ////////////////////////////////////////////// */}
                    {/* personal details section */}
      
      </div>

              
          ) : null}

          {news ? (
            <p>
              NEws section This example use media queries to transform the
              sidebar to a top navigation bar when the screen size is 700px or
              less.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default HRDashboard;
