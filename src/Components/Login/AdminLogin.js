import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminLogin(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loginEmail, setEmail] = useState("");
  const [loginPassword, setPassword] = useState("");
  const [loginID, setLoginID]= useState()
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function login(e) {
    e.preventDefault();
   let filteredData= data.find((user) => {
   return (user.email===loginEmail && user.password===loginPassword)
    });
  
if (filteredData===undefined){ // Find Method returns undefined if find condition is false.
  alert("Email or Password is incorrect, or account does not exist against this email.")
}
else{
   /* props.nameSetter(email); */
    alert("successfully Logined",{onClose: () => {
      navigate("/AdminDashboard.js");
    }});
   

    const {id,name,gender,birthday,email,password} = filteredData;

    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("gender", gender);
    localStorage.setItem("password", password);
    localStorage.setItem("birthday", birthday);

    setLoginID(localStorage.getItem("id"))
    console.log(loginID)
  }
}



  return (
    <div className="bg-dark" style={{width:"100%",height:"100%",position:"absolute"}}>
      <div className="mt-5 w-50 mx-auto bg-white p-5 rounded-3">
        <div className="container justify-content-center mt-5 ms-5 ">
          <h1 className="mb-4 display-7 ms-5 text-sm-center text-lg-start text-md-start text-center">
            Admin Login
          </h1>
          <form className="ms-5">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <label className="form-label py-2">Email</label>
                <input
                  type="email"
                  className="form-control "
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <label className="form-label py-2">Password</label>
                <input
                  type="password"
                  className="form-control "
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-12 text-sm-center text-lg-start text-md-start text-center">
              <button
                type="submit"
                className="btn btn-danger px-5 mt-4"
                onClick={login}
                id="btn"
              >
                login
              </button>
            </div>
            <div className="col-12 text-sm-center text-lg-start text-md-start text-center mt-3">
              <Link className="text-primary" to={"/adminSignUp"}>Not a Member? SignUp</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
