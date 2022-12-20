import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
                <div className="flex-row d-flex">
                    <button type="button" className="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand"  title="Free Bootstrap 4 Admin Template">Job hunter</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="collapsingNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" >Home <span className="sr-only">Home</span></a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="About page" data-target="#myModal" data-toggle="modal">About</a>
                        </li>
                    </ul>
                </div>
       </nav>
    </div>
  )
}

export default Navbar
