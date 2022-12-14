import { useNavigate } from "react-router-dom";

//
function Home() {
  var navigate = useNavigate();
  return (
    <div className="container mt-3 ">
      <h1 className="text-primary">Job Hunter</h1>
      <br></br>
      <span>By Emulation Nerds</span>

      <div className="d-flex    ">
        <p>
          Sit back and relax. Let our State of the art AI system notify you
          regarding Jobs
        </p>
      </div>
      <br></br>
      <button  className="btn btn-outline-primary custom" onClick={()=>{navigate('/userlogin')}}>
          Login
        </button>
        <button  className="btn btn-outline-primary custom  mx-4 custom" onClick={()=>{navigate('/usersignup')}}>
          Sign up
        </button>
    </div>
  );
}

export default Home;
