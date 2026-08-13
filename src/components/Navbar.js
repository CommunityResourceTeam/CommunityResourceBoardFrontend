import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Settings } from 'lucide-react';

import AccountContext from '../contexts/AccountContext';
import LogoImage from '../Primary_Logo_ResourceNest.png';

function Navbar() {
  const { loggedInUser } = useContext(AccountContext);

  return (
    <nav className="site-navbar">
      <div className="navbar-logo">
        <img src={LogoImage} alt="ResourceNest" className="navbar-logo-img" />
        <span className="navbar-logo-text">ResourceNest</span>
      </div>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          <Home size={18} /> Home
        </Link>
        <Link to="/explorePage" className="navbar-link">
          <Compass size={18} /> Explore
        </Link>  
        
      </div>

      <div className="navbar-account">
        <span className="navbar-username">{loggedInUser || "Name"}</span>
        <Link to="/settings" className="navbar-settings-btn" aria-label="Settings">
          <Settings size={20} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;