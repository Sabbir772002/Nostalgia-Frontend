import React, { useState } from 'react';
import '../MediInput/MediInput.css';
import ModernDrawer from '../../Common/ModernDrawer';

function MediInput({
  openEdit,
  setOpenEdit,
  handleModel,
  name,
  setName,
  userName,
  setUserName,
  countryName,
  setCountryName,
  jobName,
  setJobName,
}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <ModernDrawer
      isOpen={openEdit}
      onClose={() => setOpenEdit(false)}
      title="Add / Edit Medication Record"
    >
      <form className="modelForm d-flex flex-column gap-3" onSubmit={handleModel}>
        <div>
          <label className="fw-semibold mb-1">Medication Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Paracetamol"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div>
          <label className="fw-semibold mb-1">Condition / Disease</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Fever / Hypertension"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <div className="w-50">
            <label className="fw-semibold mb-1">Start Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              required
            />
          </div>
          <div className="w-50">
            <label className="fw-semibold mb-1">End Date</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              required
            />
          </div>
        </div>

        <div>
          <label className="fw-semibold mb-1">Dosage Details</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. 500mg Twice Daily"
            onChange={(e) => setCountryName(e.target.value)}
            value={countryName}
            required
          />
        </div>

        <div>
          <label className="fw-semibold mb-1">Notes / Instructions</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Take after meals"
            onChange={(e) => setJobName(e.target.value)}
            value={jobName}
            required
          />
        </div>

        <button type="submit" className="btn-modern-primary w-100 py-2 mt-3">
          Save Medication
        </button>
      </form>
    </ModernDrawer>
  );
}

export default MediInput;
