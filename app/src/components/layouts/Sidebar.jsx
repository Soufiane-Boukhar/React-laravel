// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary bg-dark elevation-4">
        <Link to="/" className="brand-link text-decoration-none">
            <img 
                src="https://assets.infyom.com/logo/blue_logo_150x150.png"
                alt="AdminLTE Logo"
                className="brand-image img-circle elevation-3"
            />
            <span className="brand-text font-weight-light">Blogs</span>
        </Link>

        <div className="sidebar">
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" id="menu">
                    <li className="nav-item">
                        <Link to="/posts" className="nav-link">
                            <i className="nav-icon fas fa-home"></i>
                            <p>Posts</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
  );
};

export default Sidebar;
