import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import ModernDrawer from '../Common/ModernDrawer';

const LogoutButton = ({ logoutUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const confirmLogout = () => {
    logoutUser();
    setIsOpen(false);
  };

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={(e) => { e.preventDefault(); setIsOpen(true); }}>
        <div id='L-box'>
          <BiLogOut className='margin' />
          <span>Log Out</span>
        </div>
      </Link>
      <ModernDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Logout"
      >
        <div className="text-center py-3">
          <BiLogOut size={48} className="text-danger mb-3" />
          <h4 className="fw-bold mb-2">Log Out of Nostalgia?</h4>
          <p className="text-muted mb-4">You can always log back in at any time.</p>
          
          <div className="d-flex gap-2">
            <button className="btn-modern-outline w-50 py-2" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="btn-modern-primary bg-danger border-danger text-white w-50 py-2" onClick={confirmLogout}>
              Log Out
            </button>
          </div>
        </div>
      </ModernDrawer>
    </div>
  );
};

export default LogoutButton;
