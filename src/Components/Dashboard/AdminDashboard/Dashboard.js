import {useEffect,useState} from 'react';
import { Button } from 'bootstrap';


const Dashboard = () => {
  
   const[record,setRecord] = useState([])

   const getData = () =>
   {
       fetch('https://jsonplaceholder.typicode.com/users')// add Own Api Url
       .then(resposne=> resposne.json())
       .then(res=>setRecord(res))
   }

   useEffect(() => {
      getData();
   },)


    return (
    <div className="col main pt-5 mt-3">


        <p className="lead d-none d-sm-block">Add Employee Details and Records</p>  
        <div className="row mb-3">
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        <div className="rotate">
                            <i className="fa fa-user fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Users</h6>
                        <h1 className="display-4">134</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                    <div className="card-body bg-danger">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Posts</h6>
                        <h1 className="display-4">87</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        <div className="rotate">
                          <i className="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Tweets</h6>
                        <h1 className="display-4">125</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-warning h-100">
                    <div className="card-body">
                        <div className="rotate">
                            <i className="fa fa-share fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Shares</h6>
                        <h1 className="display-4">36</h1>
                    </div>
                </div>
            </div>
        </div>

        <hr/>
      
        <div className="row ">
       
            <div className="col-lg-7 col-md-6 col-sm-12">
                <div>
            <button
                type="submit"
                className="btn btn-primary px-5 mt-4"
              
                id="btn" 
              >
                Buttton 
              </button>
              
              </div>
              <h5 className="mt-3 mb-3 text-secondary">
               Check More Records of Employees
              </h5>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th>No</th>
                                <th>Label</th>
                                <th>Header</th>
                                <th>Column</th>
                                <th>Record Data</th>
                            </tr>
                        </thead>
                        <tbody>
                         {record.slice(0, 5).map((output)=>
                            <tr>
                                <td>{output.id}</td>
                                <td>{output.name}</td>
                                <td>{output.email}</td>
                                <td>{output.username}</td>
                                <td>{output.website}</td>
                                <td></td>
                            </tr>
                           )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
    )
}

export default Dashboard