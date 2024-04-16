import {  useState,useEffect } from 'react'
import axios from 'axios';
import Left from "../../Components/LeftSide/Left"
import Middle from "../../Components/MiddleSide/Middle"
import Right from '../../Components/RightSide/Right'
import Nav from '../../Components/Navigation/Nav'
import moment from 'moment/moment';
import notificationSoundFile from './mixkit-access-allowed-tone-2869.wav';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MediHome.css';
import { Row, Col, Card } from 'react-bootstrap';
const MediHome = () => {
  const location = useLocation();
  //const userData = JSON.parse(new URLSearchParams(location.search).get('userData'));
  const userData= JSON.parse(localStorage.getItem('userData'));
  const [medicationSchedule, setMedicationSchedule] = useState([
    { name: 'Medication A', dosage: '10mg', times: ['Morning', 'Noon', 'Night'], image: 'http://localhost:8000/media/d.png' },
    { name: 'Medication B', dosage: '20mg', times: ['Morning', 'Noon'], image: 'http://localhost:8000/media/d.png' },
    { name: 'Medication C', dosage: '5mg', times: ['Morning', 'Night'], image: 'http://localhost:8000/media/d.png' },
    { name: 'Medication D', dosage: '15mg', times: ['Noon', 'Night'], image: 'http://localhost:8000/media/d.png' },
    { name: 'Medication E', dosage: '25mg', times: ['Night'], image: 'http://localhost:8000/media/d.png' },
    { name: 'Medication F', dosage: '30mg', times: ['Morning', 'Noon', 'Night'], image: 'http://localhost:8000/media/d.png' }
  ]);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [alertTime, setAlertTime] = useState('');
  
  

  // State variable for new medication input
  const [newMedication, setNewMedication] = useState
  ({
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
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + hours);
    targetTime.setMinutes(targetTime.getMinutes() + minutes);

    // Show notification after 1 minute
    setTimeout(() => {
      showNotification('Time to take medication!');
      // Play notification sound
      const notificationSound = new Audio(notificationSoundFile);
      notificationSound.play();
      const interval = setInterval(() => {
        notificationSound.play();
      }, 1000); // Play every second
    
      // Stop playing sound after 1 minute
      setTimeout(() => {
        clearInterval(interval);
        notificationSound.pause(); // Pause the sound
      }, 60000); // Stop after 1 minute // Check every minute
    }, 60000);

    // Set up intervals for each hour/minute combination
    const interval = setInterval(() => {
      const currentTime = new Date();
      if (currentTime.getHours() === targetTime.getHours() && currentTime.getMinutes() === targetTime.getMinutes()) {
        showNotification('Time to take medication!');
        // Play notification sound
        const notificationSound = new Audio(notificationSoundFile);
        notificationSound.play();
        const interval = setInterval(() => {
          notificationSound.play();
        }, 1000); // Play every second
      
        // Stop playing sound after 1 minute
        setTimeout(() => {
          clearInterval(interval);
          notificationSound.pause(); // Pause the sound
        }, 60000); // Stop after 1 minute
      }
    }, 60000); // Check every minute

    // Clear the interval after the specified time
    setTimeout(() => clearInterval(interval), hours * 60 * 60 * 1000 + minutes * 60 * 1000);
  };
      const [body,setBody] =useState("")
      const [importFile,setImportFile] =useState("")
   
   const [search,setSearch] =useState("")

    
  const [following,setFollowing] =useState("")
        
  const [showMenu,setShowMenu] =useState(false)
  const [images,setImages] =  useState(null)

  return (
    <div className='interface'>
        <Nav 
        search={search}
        setSearch={setSearch}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        />

    <div className="medhome">
        <Left />


      <div className="rounded med scrollable medication-schedule">
        <h4 className="headmed">Medication Schedule</h4>
        {['Morning', 'Noon', 'Night'].map((timeFrame, index) => (
         <div className="m-2 row d-flex" key={index}>
         <h5>{timeFrame}</h5>
         {sortMedicationByNextTimeFrame().map((med, medIndex) => (
           med.times.includes(timeFrame) && (
             <div className="col-md-4" key={medIndex}>
               <Card className="mb-3">
                 <Card.Img src={med.image} className="card-img-top" alt="Medication" style={{  height: '100px' }} />
                 <Card.Body>
                   <Card.Title>{med.name}</Card.Title>
                   <Card.Text>Dosage: {med.dosage}</Card.Text>
                 </Card.Body>
               </Card>
             </div>
           )
         ))}
       </div>       
        ))}
      </div>

    <div  className="med scrollable notes rounded">
        <h4 className="note">Notes</h4>
        {notes.map((note, index) => (
          <div key={index}>
            <h5>{note.name}</h5>
            <p>{note.note}</p>
          </div>
        ))}
    </div>

        <div className="med addmed rounded">
          <h4 className="m-1 headmed">Add Medication</h4>
          <div className="m-1 form-group">
            <label className="m-1">Medication Name</label>
            <input
              type="text"
              className="m-1 form-control"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            />
          </div>
          <div className="m-1 form-group">
            <label className="m-1" >Dosage</label>
            <input
              type="text"
              className="m-1 form-control"
              value={newMedication.dosage}
              onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
            />
          </div>
          <div className="m-1 form-group">
            <label className="m-1">Times per Day</label>
            <div>
              {['Morning', 'Noon', 'Night'].map(time => (
                <div key={time} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={time}
                    value={time}
                    checked={newMedication.times.includes(time)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setNewMedication(prevState => {
                        if (isChecked) {
                          return { ...prevState, times: [...prevState.times, time] };
                        } else {
                          return { ...prevState, times: prevState.times.filter(t => t !== time) };
                        }
                      });
                    }}
                  />
                  <label className="m-1form-check-label" htmlFor={time}>{time}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="m-1 form-group">
            <label className="m-1">Note</label>
            <input
              type="text"
              className="m-1 form-control"
              value={newMedication.note}
              onChange={(e) => setNewMedication({ ...newMedication, note: e.target.value })}
            />
          </div>
          <button className="m-1 btn btn-primary" onClick={handleAddMedication}>Add Medication</button>
        </div>
        </div>


        
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
        <div className="fixed-bottom d-flex justify-content-end m-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Set Alert Time</button>
        </div>

      
    </div>
  )
}
export default MediHome