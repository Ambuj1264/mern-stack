import React from 'react'
import {Link, useNavigate} from "react-router-dom"
function Nav() {
  const navigate=useNavigate();
  const authToken=sessionStorage.getItem("token");
  const emailId=sessionStorage.getItem("email");
  const sineout=()=>{
    sessionStorage.clear();
    navigate("/login")
  }
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-info">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">MERN-App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {
        authToken?
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to="/fetchAll">Fetch All</Link>
        </li>
       
        <li className="nav-item">
         <button className='btn btn-success' onClick={sineout}> Welcome: {emailId} |Logout </button>
        </li>
      </ul>
      :
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register Here</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
      </ul>
      }
     
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Nav