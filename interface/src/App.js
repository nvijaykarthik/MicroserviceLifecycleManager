import { Component } from "react";
import {Route,Routes,Link} from 'react-router-dom'
import Home from "./Home";
import Portfolio from "./Portfolio";
import ServiceGroup from "./ServiceGroup";
import Services from "./Services";

class App extends Component {
  render() {
    return (
      <div className="browser">
        <nav className="navbar navbar-expand-lg navbar-dark  bg-dark shadow p-2 mb-2 rounded">
          <div className="container">
            <Link to="/" className="navbar-brand">Microservice Lifecycle manager</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link to="/portfolio" className="dropdown-item">Portfolio</Link></li>
                    <li><Link to="/serviceGroup" className="dropdown-item">Service Group</Link></li>                    
                  </ul>
                </li>
                <li className="nav-item">
                    <Link to="/services" className="nav-link">Services</Link>
                  </li>
              </ul>
              <ul className="navbar-nav d-flex">
                <li className="nav-item dropdown">
                    <Link to="" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Login
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link to="/" className="dropdown-item">Profile</Link></li>
                      <li><span className="dropdown-item">Roles</span><span className="dropdown-item">Roles</span><span className="dropdown-item">Roles</span></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link to="/" className="dropdown-item">log off</Link></li>
                    </ul>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container p-2">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
          <Route path="/serviceGroup" element={<ServiceGroup />}></Route>
          <Route path="/services" element={<Services />}></Route>
        </Routes>
        </div>
      </div>
    );
  }
}

export default App;
