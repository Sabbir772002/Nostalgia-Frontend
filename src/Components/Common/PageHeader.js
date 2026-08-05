import React from 'react';
import '../../Pages/styles/ModernUI.css';

const PageHeader = ({ title, subtitle, actionButton }) => {
  return (
    <div className="page-hero-banner d-flex align-items-center justify-content-between flex-wrap gap-3">
      <div>
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
};

export default PageHeader;
