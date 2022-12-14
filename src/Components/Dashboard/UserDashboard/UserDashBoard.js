import { useNavigate } from "react-router-dom";
import "./UserDashBoard.css";

function UserDashboard() {
  var user = localStorage.getItem("user");
  var navigate = useNavigate();
  var yes = false;

  return (
    <div className="container mt-2">
      <nav className="navbar  ">
        <div className="container-fluid">
          <a className="navbar-brand"><b>Dashboard</b></a>
          <form className="d-flex">
            <button
              className="btn btn-outline-primary custom"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </nav>
      <div className="conatiner">
        {yes ? (
          <h1></h1>
        ) : (
          <div className="text-center">
            <h5 className="text-primary">Seems your profile is incomplete</h5>{" "}
            <button
              className="btn btn-outline-primary custom"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
