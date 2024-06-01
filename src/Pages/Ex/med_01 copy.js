import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MedicationPage.css'; // Custom CSS for styling

const MedicationPage = () => {
  // State variables for medication schedule, notes, and new medication
  const [medicationSchedule, setMedicationSchedule] = useState([
    { name: 'Medication A', dosage: '10mg', times: ['Morning', 'Noon', 'Night'], image: `${api.url}:8000/media/d.png` },
    { name: 'Medication B', dosage: '20mg', times: ['Morning', 'Noon'], image: `${api.url}:8000/media/d.png` },
    // { name: 'Medication B', dosage: '20mg', times: ['Morning', 'Noon'], image: 'http://localhost:8000/media/d.png' },
    { name: 'Medication C', dosage: '5mg', times: ['Morning', 'Night'], image: `${api.url}:8000/media/d.png` },
    { name: 'Medication D', dosage: '15mg', times: ['Noon', 'Night'], image: `${api.url}:8000/media/d.png` },
    { name: 'Medication E', dosage: '25mg', times: ['Night'], image: `${api.url}:8000/media/d.png` },
    { name: 'Medication F', dosage: '30mg', times: ['Morning', 'Noon', 'Night'], image: `${api.url}:8000/media/d.png` }
  ]);
  const [notes, setNotes] = useState([]);
  const [alertTime, setAlertTime] = useState('');
  const [showModal, setShowModal] = useState(false);

  // State variable for new medication input
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    times: [],
    note: ''
  });

  // Function to handle adding medication
  const handleAddMedication = () => {
    // Update medication schedule with new medication
    setMedicationSchedule([...medicationSchedule, newMedication]);
    // Add new medication to notes
    setNotes([...notes, { ...newMedication, time: newMedication.time || 'General' }]);
    // Clear the new medication form fields
    setNewMedication({
      name: '',
      dosage: '',
      times: [],
      note: ''
    });
  };

  // Function to display system notification
  const showNotification = (message) => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    }
  };

  // Function to display alert at specific time
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getHours();
      if (currentTime === parseInt(alertTime)) {
        showNotification('Time to take medication!');
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [alertTime]);

  // Function to sort medication by current time frame (Morning, Noon, Night)
  const sortMedicationByTime = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 12) return 'Morning';
    if (currentTime >= 12 && currentTime < 18) return 'Noon';
    return 'Night';
  };

  // Function to sort medication by next time frame
  const sortMedicationByNextTimeFrame = () => {
    const currentTimeFrame = sortMedicationByTime();
    const currentMedications = medicationSchedule.filter(med => med.times.includes(currentTimeFrame));
    const nextMedications = medicationSchedule.filter(med => !med.times.includes(currentTimeFrame));
    return [...currentMedications, ...nextMedications];
  };

  // Function to handle setting alert time
  const handleSetAlertTime = () => {
    setShowModal(false);
    const [hours, minutes] = alertTime.split(':').map(time => parseInt(time));
    showNotification(`Alert set for ${hours} hours and ${minutes} minutes from now`);
    // Set up intervals for each hour/minute combination
    const interval = setInterval(() => {
      const currentTime = new Date();
      const targetTime = new Date(currentTime);
      targetTime.setHours(currentTime.getHours() + hours);
      targetTime.setMinutes(currentTime.getMinutes() + minutes);
      if (targetTime.getHours() === currentTime.getHours() && targetTime.getMinutes() === currentTime.getMinutes()) {
        showNotification('Time to take medication!');
      }
    }, 60000); // Check every minute
    // Clear the interval after the specified time
    setTimeout(() => clearInterval(interval), hours * 60 * 60 * 1000 + minutes * 60 * 1000);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Set Alert Time Modal */}
        <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Set Alert Time</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Select Time (24-hour format)</label>
                  <input
                    type="time"
                    className="form-control"
                    value={alertTime}
                    onChange={(e) => setAlertTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSetAlertTime}>Set Alert</button>
              </div>
            </div>
          </div>
        </div>

        {/* Medication Schedule */}
        <div className="col-md-4">
          <h4>Medication Schedule</h4>
          {['Morning', 'Noon', 'Night'].map((timeFrame, index) => (
            <div key={index}>
              <h5>{timeFrame}</h5>
              {sortMedicationByNextTimeFrame().map((med, medIndex) => (
                med.times.includes(timeFrame) && (
                  <div className="card mb-3" key={medIndex}>
                    <img src={med.image} className="card-img-top" alt="Medication" style={{ width: '180px', height: '100px' }} />
                    <div className="card-body">
                      <h6 className="card-title">{med.name}</h6>
                      <p className="card-text">Dosage: {med.dosage}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="col-md-4">
          <h4>Notes</h4>
          {notes.map((note, index) => (
            <div key={index}>
              <h5>{note.name}</h5>
              <p>{note.note}</p>
            </div>
          ))}
        </div>

        {/* Add Medication */}
        <div className="col-md-4">
          <h4>Add Medication</h4>
          <div className="form-group">
            <label>Medication Name</label>
            <input
              type="text"
              className="form-control"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Dosage</label>
            <input
              type="text"
              className="form-control"
              value={newMedication.dosage}
              onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Times per Day</label>
            <select
              className="form-control"
              value={newMedication.times}
              onChange={(e) => setNewMedication({ ...newMedication, times: Array.from(e.target.selectedOptions, option => option.value) })}
              multiple
            >
              <option value="Morning">Morning</option>
              <option value="Noon">Noon</option>
              <option value="Night">Night</option>
            </select>
          </div>
          <div className="form-group">
            <label>Note</label>
            <input
              type="text"
              className="form-control"
              value={newMedication.note}
              onChange={(e) => setNewMedication({ ...newMedication, note: e.target.value })}
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddMedication}>Add Medication</button>
        </div>
      </div>
      <div className="fixed-bottom m-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Set Alert Time</button>
      </div>
    </div>
  );
};

export default MedicationPage;
