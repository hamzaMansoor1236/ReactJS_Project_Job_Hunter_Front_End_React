import { useNavigate } from "react-router-dom";


function UserDashboard() {
  var user = localStorage.getItem("username");
  var navigate = useNavigate();
  var yes = false;

  return (
    <div className="container mt-2">
      <nav className="navbar  ">
        <div className="container-fluid">
          <p className="navbar-brand text-primary customP"><b>{user} Dashboard</b></p>
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
          null
        ) : (
          <div className="text-center">
            <h5 className="text-primary">Seems your prefrences are incomplete</h5>{" "}
            <button
              className="btn btn-outline-primary "
              onClick={() => {
            
                navigate("/userprofile");
              }}
            >
              Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
