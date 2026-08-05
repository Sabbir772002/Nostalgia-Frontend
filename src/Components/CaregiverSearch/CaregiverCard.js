import React from 'react';
import { Button } from 'react-bootstrap';
import api from '../../util/api';
import '../../Pages/styles/ModernUI.css';

const CaregiverCard = ({ caregiver }) => {
  function aged(dateOfBirth) {
    if (!dateOfBirth) return 'N/A';
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age > 0 ? age : 'N/A';
  }

  const imgUrl = caregiver.img ? `${api.url}:8001/${caregiver.img}` : `${api.url}:8001/media/image/download_lX6bjA6.jpeg`;

  return (
    <div className="modern-user-card text-start">
      <div>
        <div className="card-avatar-wrapper text-center mb-3">
          <img
            src={imgUrl}
            className="card-avatar-img"
            alt={caregiver.name}
            onError={(e) => { e.target.onerror = null; e.target.src = `${api.url}:8001/media/image/download_lX6bjA6.jpeg`; }}
          />
          <span className="badge-vector-match bg-primary">
            ✔ Verified Caregiver
          </span>
        </div>

        <h4 className="card-user-name text-center mb-1">{caregiver.name}</h4>
        <p className="text-center text-muted mb-2" style={{ fontSize: '0.88rem' }}>
          {aged(caregiver.dob)} Years Old | {caregiver.gender || 'Nurse'}
        </p>

        <div className="p-3 bg-light rounded-3 mb-3" style={{ fontSize: '0.88rem' }}>
          <div className="mb-1 text-dark"><strong>🩺 Specialization:</strong> {caregiver.type || 'Elder Care'}</div>
          <div className="mb-1 text-dark"><strong>⭐ Experience:</strong> {caregiver.experience} Years</div>
          <div className="mb-1 text-dark"><strong>🏥 Hospital:</strong> {caregiver.hname || 'Independent'}</div>
          <div className="text-dark"><strong>📍 Location:</strong> {caregiver.location || caregiver.branch || 'Dhaka'} ({caregiver.thana})</div>
        </div>
      </div>

      <div className="card-actions-wrapper">
        <a href={`tel:0${caregiver.phone}`} className="w-100 text-decoration-none">
          <Button className="btn-modern-primary w-100 py-2">
            📞 Contact Caregiver (0{caregiver.phone})
          </Button>
        </a>
      </div>
    </div>
  );
};

export default CaregiverCard;
