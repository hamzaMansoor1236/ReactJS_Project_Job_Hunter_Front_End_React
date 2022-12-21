import React from 'react'

function Sidebar() {
  return (
    <div>
      <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" >
            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="#"><h5>Hamza Mansoor</h5></a></li>
                <li className="nav-item mb-2 "><a className="nav-link text-secondary" href="#"><i className="fas fa-user font-weight-bold"></i> <span classNameName="ml-3">Admin</span></a></li>
                <li className="nav-item mb-2">
                    <a className="nav-link text-secondary" href="" data-toggle="collapse" data-target="#submenu1"><i className="far fa-file-word font-weight-bold"></i> <span classNameName="ml-3"> Users</span></a>
                </li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="far fa-chart-bar font-weight-bold"></i> <span classNameName="ml-3">HR</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="fas fa-file-export font-weight-bold"></i><span classNameName="ml-3">HR Posts</span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="fas fa-tablet-alt font-weight-bold"></i><span classNameName="ml-3">top Posts</span></a></li>
            </ul>
       </div>
    </div>
  )
}

export default Sidebar
