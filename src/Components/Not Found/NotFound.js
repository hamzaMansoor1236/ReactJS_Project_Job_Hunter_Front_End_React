//used for navigation
import { useNavigate } from "react-router-dom";

function NotFound() {
  //variable for dealing onclick navigation to home
  let navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
      <div className="text-center row">
        <div className=" col-md-6">
          <img
            src="error.jpg"
            alt=""
            className="img-fluid"
          />
        </div>
        <div className=" col-md-6 mt-5">
          <p className="fs-3">
            {" "}
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
