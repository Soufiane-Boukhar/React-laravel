
import React, { useState } from 'react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className={`nav-item dropdown user-menu ${isDropdownOpen ? 'show' : ''}`}>
          <a
            href="#"
            className="nav-link dropdown-toggle"
            onClick={toggleDropdown}
          >
            <img
              src="https://assets.infyom.com/logo/blue_logo_150x150.png"
              className="user-image img-circle elevation-2"
              alt="User Image"
            />
            <span className="d-none d-md-inline">Boukhar Soufiane</span>
          </a>
          <ul className={`dropdown-menu dropdown-menu-lg dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`}>
            {/* User image */}
            <li className="user-header bg-primary">
              <img
                src="https://assets.infyom.com/logo/blue_logo_150x150.png"
                className="img-circle elevation-2"
                alt="User Image"
              />
              <p>
                {/* Replace with user's name */}
                <small>Member since {/* Replace with user's join date */}</small>
              </p>
            </li>
            {/* Menu Footer */}
            <li className="user-footer">
              <a href="#" className="btn btn-default btn-flat">
                Profile
              </a>
              <a
                href="#"
                className="btn btn-default btn-flat float-right"
                onClick={(e) => {
                  e.preventDefault();
                  // Add your sign-out logic here
                }}
              >
                Sign out
              </a>
              {/* Include the logout form if needed */}
              {/* <form id="logout-form" action="/logout" method="POST" className="d-none">
                @csrf
              </form> */}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
