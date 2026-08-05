import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Left from "../../Components/LeftSide/Left";
import Nav from '../../Components/Navigation/Nav';
import PageHeader from '../../Components/Common/PageHeader';
import ModernDrawer from '../../Components/Common/ModernDrawer';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import api from '../../util/api';
import '../styles/ModernUI.css';

const MediHome = () => {
  const rawUser = JSON.parse(localStorage.getItem('userData')) || {};
  const activeUsername = rawUser.username ? (rawUser.username.includes('@') ? rawUser.username.split('@')[1] : rawUser.username) : '';
  const userData = { ...rawUser, username: activeUsername };

  const [medicationSchedule, setMedicationSchedule] = useState([]);
  const [morningTime, setMorningTime] = useState('08:00');
  const [noonTime, setNoonTime] = useState('14:00');
  const [nightTime, setNightTime] = useState('20:00');
  const [gap, setGap] = useState('30');
  const [done, setDone] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [image, setImage] = useState(null);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 30);

  const [newMedication, setNewMedication] = useState({
    user: userData.username,
    name: '',
    dosage: '',
    morning: false,
    noon: false,
    night: false,
    after: 'After Meal',
    note: '',
    start_date: today.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    img: null
  });

  const getTimeFrame = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 18) return 'Noon';
    return 'Night';
  };

  const currentFrame = getTimeFrame();
  const timeFrames = ['Morning', 'Noon', 'Night'];

  const fetchMedTime = useCallback(async () => {
    if (!userData.username) return;
    try {
      const response = await axios.get(`${api.url}:8001/medtime`, {
        params: { username: userData.username }
      });
      if (response.data) {
        setMorningTime(response.data.morning || '08:00');
        setNoonTime(response.data.noon || '14:00');
        setNightTime(response.data.night || '20:00');
        setGap(response.data.gap || '30');
      }
    } catch (error) {
      console.error('Error fetching med time:', error);
    }
  }, [userData.username]);

  const fetchMedications = useCallback(async () => {
    if (!userData.username) return;
    try {
      const response = await axios.get(`${api.url}:8001/medication`, {
        params: { username: userData.username }
      });
      setMedicationSchedule(response.data || []);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  }, [userData.username]);

  const fetchDoneStatus = useCallback(async () => {
    if (!userData.username) return;
    try {
      const response = await axios.get(`${api.url}:8001/done`, {
        params: {
          username: userData.username,
          date: moment().format('YYYY-MM-DD'),
          time: currentFrame
        }
      });
      setDone(response.data && response.data.done === 1);
    } catch (error) {
      console.error('Error fetching done status:', error);
    }
  }, [userData.username, currentFrame]);

  useEffect(() => {
    fetchMedTime();
    fetchMedications();
    fetchDoneStatus();
  }, [fetchMedTime, fetchMedications, fetchDoneStatus]);

  const handleTimeCheckboxChange = (time) => {
    setNewMedication(prev => ({
      ...prev,
      [time]: !prev[time]
    }));
  };

  const handleAddMedication = async (e) => {
    if (e) e.preventDefault();
    if (!newMedication.name || !newMedication.dosage) {
      alert("Please specify medication name and dosage.");
      return;
    }

    const formData = new FormData();
    formData.append('user', userData.username);
    formData.append('name', newMedication.name);
    formData.append('dosage', newMedication.dosage);
    formData.append('morning', newMedication.morning ? 1 : 0);
    formData.append('noon', newMedication.noon ? 1 : 0);
    formData.append('night', newMedication.night ? 1 : 0);
    formData.append('after', newMedication.after);
    formData.append('note', newMedication.note);
    formData.append('start_date', newMedication.start_date);
    formData.append('end_date', newMedication.end_date);
    if (image) formData.append('img', image);

    try {
      await axios.post(`${api.url}:8001/medication`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchMedications();
      setNewMedication({
        user: userData.username,
        name: '',
        dosage: '',
        morning: false,
        noon: false,
        night: false,
        after: 'After Meal',
        note: '',
        start_date: today.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        img: null
      });
      setImage(null);
      alert("Medication added successfully!");
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  const toggleDoneStatus = async () => {
    const formData = new FormData();
    formData.append('type', done ? 'notdone' : 'done');
    formData.append('username', userData.username);
    formData.append('date', moment().format('YYYY-MM-DD'));
    formData.append('time', currentFrame);

    try {
      await axios.post(`${api.url}:8001/done`, formData);
      setDone(!done);
    } catch (error) {
      console.error('Error toggling done status:', error);
    }
  };

  const handleSetAlertTime = async () => {
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('morning', morningTime);
    formData.append('noon', noonTime);
    formData.append('night', nightTime);
    formData.append('gap', gap);

    try {
      await axios.post(`${api.url}:8001/medtime`, formData);
      fetchMedTime();
      setShowDrawer(false);
      alert("Medication alert schedule updated!");
    } catch (error) {
      console.error('Error setting alert time:', error);
    }
  };

  return (
    <div className='interface'>
      <Nav search={search} setSearch={setSearch} showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="btw">
        <Left />
        <div className="container-fluid px-3 py-2">
          <PageHeader
            title="Medication & Health Manager"
            subtitle="Track daily dosages, set reminder alerts, and maintain health schedules."
            actionButton={
              <Button className="btn-modern-primary py-2 px-4 shadow-sm" onClick={() => setShowDrawer(true)}>
                ⏰ Alarm Timings
              </Button>
            }
          />

          <div className="row g-4">
            {/* Schedule List */}
            <div className="col-12 col-lg-7">
              <div className="glass-search-card">
                <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                  <h4 className="fw-bold text-dark m-0">Daily Schedule ({currentFrame})</h4>
                  <div className="d-flex align-items-center bg-light px-3 py-2 rounded-pill border">
                    <span className="fw-semibold text-dark me-2">Dose Status ({currentFrame}):</span>
                    <input
                      type="checkbox"
                      className="form-check-input ms-1"
                      style={{ width: '1.3em', height: '1.3em', cursor: 'pointer' }}
                      checked={done}
                      onChange={toggleDoneStatus}
                    />
                    <span className={`ms-2 badge ${done ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {done ? 'Taken' : 'Pending'}
                    </span>
                  </div>
                </div>

                {timeFrames.map((frame) => {
                  const frameMeds = medicationSchedule.filter(med => med.times && med.times.includes(frame));
                  return (
                    <div key={frame} className="mb-4">
                      <h5 className="fw-bold text-primary mb-3">
                        {frame === 'Morning' ? '🌅 Morning' : frame === 'Noon' ? '☀️ Noon' : '🌙 Night'}
                      </h5>
                      {frameMeds.length === 0 ? (
                        <p className="text-muted italic bg-light p-3 rounded-3" style={{ fontSize: '0.88rem' }}>
                          No medications scheduled for {frame.toLowerCase()}.
                        </p>
                      ) : (
                        <div className="row g-3">
                          {frameMeds.map((med, idx) => {
                            const imgUrl = med.image ? `${api.url}:8001/${med.image}` : `${api.url}:8001/media/d.png`;
                            return (
                              <div key={idx} className="col-12 col-md-6">
                                <Card className="modern-user-card text-start p-3 h-100">
                                  <div className="d-flex align-items-center gap-3">
                                    <img
                                      src={imgUrl}
                                      alt={med.name}
                                      className="rounded-3"
                                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                      onError={(e) => { e.target.onerror = null; e.target.src = `${api.url}:8001/media/d.png`; }}
                                    />
                                    <div>
                                      <h5 className="fw-bold text-dark mb-1">{med.name}</h5>
                                      <p className="text-muted m-0" style={{ fontSize: '0.85rem' }}>Dosage: {med.dosage}</p>
                                      <span className="badge bg-light text-primary border mt-1" style={{ fontSize: '0.75rem' }}>
                                        {med.after}
                                      </span>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Form */}
            <div className="col-12 col-lg-5">
              <div className="glass-search-card">
                <h4 className="fw-bold text-dark mb-4 pb-2 border-bottom">Add Medication</h4>
                <form onSubmit={handleAddMedication}>
                  <div className="form-group mb-3">
                    <label className="fw-semibold mb-1">Medication Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Paracetamol 500mg"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fw-semibold mb-1">Dosage</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 1 Tablet"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fw-semibold mb-1">Daily Schedule</label>
                    <div className="d-flex gap-3 bg-light p-3 rounded-3 border">
                      {['Morning', 'Noon', 'Night'].map(t => (
                        <div key={t} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`check-${t}`}
                            checked={newMedication[t.toLowerCase()]}
                            onChange={() => handleTimeCheckboxChange(t.toLowerCase())}
                          />
                          <label className="form-check-label text-dark fw-semibold" htmlFor={`check-${t}`}>{t}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 form-group mb-3">
                      <label className="fw-semibold mb-1">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newMedication.start_date}
                        onChange={(e) => setNewMedication({ ...newMedication, start_date: e.target.value })}
                      />
                    </div>
                    <div className="col-6 form-group mb-3">
                      <label className="fw-semibold mb-1">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newMedication.end_date}
                        onChange={(e) => setNewMedication({ ...newMedication, end_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="fw-semibold mb-1">Instruction</label>
                    <select
                      className="form-select"
                      value={newMedication.after}
                      onChange={(e) => setNewMedication({ ...newMedication, after: e.target.value })}
                    >
                      <option value="After Meal">After Meal</option>
                      <option value="Before Meal">Before Meal</option>
                    </select>
                  </div>

                  <div className="form-group mb-4">
                    <label className="fw-semibold mb-1">Note</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Take with water"
                      value={newMedication.note}
                      onChange={(e) => setNewMedication({ ...newMedication, note: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="btn-modern-primary w-100 py-2 shadow-sm">
                    + Save Medication
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Config Drawer */}
      <ModernDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Configure Reminder Timings"
      >
        <div className="form-group mb-3">
          <label className="fw-semibold mb-1">Morning Alarm Time</label>
          <input type="time" className="form-control" value={morningTime} onChange={(e) => setMorningTime(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label className="fw-semibold mb-1">Noon Alarm Time</label>
          <input type="time" className="form-control" value={noonTime} onChange={(e) => setNoonTime(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label className="fw-semibold mb-1">Night Alarm Time</label>
          <input type="time" className="form-control" value={nightTime} onChange={(e) => setNightTime(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label className="fw-semibold mb-1">Snooze Interval (Minutes)</label>
          <input type="text" className="form-control" value={gap} onChange={(e) => setGap(e.target.value)} />
        </div>
        <Button className="btn-modern-primary w-100 py-2 mt-3" onClick={handleSetAlertTime}>
          Save Alarm Schedule
        </Button>
      </ModernDrawer>
    </div>
  );
};

export default MediHome;