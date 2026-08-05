import React from 'react';
import '../../Pages/styles/ModernUI.css';

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
  buttonText = "Search",
  children
}) => {
  return (
    <div className="glass-search-card">
      <form onSubmit={onSubmit}>
        <div className="input-group search-input-group">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <button className="btn search-btn-gradient" type="submit">
            {buttonText}
          </button>
        </div>
        {children && <div className="mt-3">{children}</div>}
      </form>
    </div>
  );
};

export default SearchBar;
