import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/Store/auth'
export default function Navbar() {

  const { isLoggedIn, LogoutUser } = useAuth();
  const data = localStorage.getItem("USER");
  const userData = JSON.parse(data);
  const navigate = useNavigate();

  return (
    <nav class="navbar navbar-expand-lg">
      <div className="container-fluid" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
        <a class="navbar-brand fw-bolder" style={{ color: "#0d6efd" }}>AppName</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            {
              userData && userData.userType === 'student' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/form'>SeekPermission</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to='/schedule'>Scheduler</Link>
                  </li>
                </>
              )
            }

          </ul>
          <form className="d-flex fs-6 fw-medium ms-auto navbar-nav">
            {isLoggedIn ? (
              <>
                <div className="btn-txt-grp d-flex">
                  <p className='user-name my-auto fw-bolder' style={{ marginRight: "5px" }}>{userData.fullname}</p>
                  <button className="btn btn-outline-danger ms-2 fw-bold" type="button" style={{ maxHeight: "min-content", background: "none", color: "red", padding: "5px 10px", fontSize: "15px" }} onClick={() => { LogoutUser(); navigate('/login') }}>Logout</button>
                </div>
              </>
            ) : (
              <>

                <button className="btn btn-outline-success ms-2 fw-bold" type="button" style={{ maxHeight: "min-content", background: "none", color: "green", padding: "4px 8px", fontSize: "15px", maxWidth: "70px" }} onClick={() => { navigate('/login') }}>SignIn</button>
                <button className="btn btn-outline-primary ms-2 fw-bold" type="button" style={{ maxHeight: "min-content", background: "none", color: "blue", padding: "4px 8px", fontSize: "15px", maxWidth: "70px" }} onClick={() => { navigate('/register') }}>SignUp</button>
              </>
            )}
          </form>
        </div>
      </div>
      <style>{`
        li{
          font-weight:bold
        }
      `}</style>
    </nav>
  )
}
