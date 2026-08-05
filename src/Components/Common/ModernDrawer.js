import React, { useEffect } from 'react';
import '../../Pages/styles/ModernUI.css';

const ModernDrawer = ({ isOpen, onClose, title, children, footer, size = "md" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass = size === "lg" ? "modern-drawer-lg" : size === "xl" ? "modern-drawer-xl" : size === "sm" ? "modern-drawer-sm" : "modern-drawer-md";

  return (
    <div className="modern-drawer-backdrop" onClick={onClose}>
      <div className={`modern-drawer-container ${sizeClass}`} onClick={(e) => e.stopPropagation()}>
        <div className="modern-drawer-header">
          <h3 className="modern-drawer-title">{title}</h3>
          <button type="button" className="modern-drawer-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modern-drawer-body">
          {children}
        </div>

        {footer && (
          <div className="modern-drawer-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernDrawer;
