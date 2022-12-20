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
                    <div className='col-3'><Sidebar /></div>
                    <div className='col-9'><Dashboard /></div>
                    
               
             </div>
            </div>  
        </div>  
        );
    }
 
export default App;