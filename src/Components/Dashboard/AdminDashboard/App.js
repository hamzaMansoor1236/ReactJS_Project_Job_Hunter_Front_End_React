import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function App(){

        return (
            <div>
                <Navbar/>
                <div className="container-fluid" id="main">
                 <div className="row row-offcanvas row-offcanvas-left">
                    <Sidebar/>
                  <Dashboard/>
               
             </div>
            </div>  
        </div>  
        );
    }
 
export default App;