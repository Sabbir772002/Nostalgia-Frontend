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
  const [image, setImage] = useState(null);
 
  const today = new Date();
  // Calculate end date: Today's date + 30 days
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 30);
  const [morningTime, setMorningTime] = useState('08:00');
  const [noonTime, setNoonTime] = useState('14:00');
  const [nightTime, setNightTime] = useState('20:00');
  const fetchtime = () =>{
    axios.get('http://localhost:8000/medtime',
    {
      params: {
        username: userData.username
      }
    })
    .then((response) => {
      setMorningTime(response.data.morning);
      setNoonTime(response.data.noon);
      setNightTime(response.data.night);
      setgap(response.data.gap);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    fetchtime();
  }, [userData.username]);
  const [newMedication, setNewMedication] = useState
  ({
    user:userData.username,
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
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setNewMedication({ ...newMedication, img: e.target.files[0] });
    
  };
  useEffect(() => {
    axios.get('http://localhost:8000/medication',
    {
      params: {
        username: userData.username
      }
    })
    .then((response) => {
      console.log(response.data);
      setMedicationSchedule(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [newMedication]);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [alertTime, setAlertTime] = useState('');
  // State variable for new medication input
  
    const handleTimeCheckboxChange = (time) => {
    setNewMedication(prevState => ({
      ...prevState,
      [time]: !prevState[time]
    }));
  };

  // Function to handle adding medication
  const handleAddMedication = () => {
    // Update medication schedule with new medicatiom
    
    // setMedicationSchedule([...medicationSchedule, newMedication]);
    // Add new medication to notes
    // setNotes([...notes, { ...newMedication, time: newMedication.time || 'General' }]);
     console.log(newMedication);
    const nedmed = new FormData();
    nedmed.append('user',userData.username);
    nedmed.append('name',newMedication.name);
    nedmed.append('dosage',newMedication.dosage);
    nedmed.append('morning',newMedication.morning?1:0);
    nedmed.append('noon',newMedication.noon?1:0);
    nedmed.append('night',newMedication.night?1:0);
    nedmed.append('after',newMedication.after);
    nedmed.append('note',newMedication.note);
    nedmed.append('start_date',newMedication.start_date);
    nedmed.append('end_date',newMedication.end_date);
    nedmed.append('img',image);
    console.log(nedmed);
    axios.post('http://127.0.0.1:8000/medication',nedmed,
      {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      // Handle successful response if needed
      console.log('Medication added successfully:', response.data);
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error adding medication:', error);
    });
  axios.get('http://localhost:8000/medication',
    {
      params: {
        username: userData.username
      }
    })
    .then((response) => {
      console.log(response.data);
      setMedicationSchedule(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  // Calculate today's date
  const today = new Date();
  // Calculate end date: Today's date + 30 days
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 30);
    // Clear the new medication form fields
    setNewMedication({
      user:userData.username,
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
  
  const timefind = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 12) return ['Morning', 'Noon', 'Night'];
    if (currentTime >= 12 && currentTime < 18) return ['Noon', 'Night','Morning' ];
    return ['Night','Morning', 'Noon'];
  };
  const timebox=timefind();

  // Function to sort medication by current time frame (Morning, Noon, Night)
  const sortMedicationByTime = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 12) return 'Morning';
    if (currentTime >= 12 && currentTime < 18) return 'Noon';
    return 'Night';
  };
const time=sortMedicationByTime();
  // Function to sort medication by next time frame
  const sortMedicationByNextTimeFrame = () => {
    const currentTimeFrame = sortMedicationByTime();
    console.log("akhon somoy");
    console.log(currentTimeFrame);
    const currentMedications = medicationSchedule.filter(med => med.times.includes(currentTimeFrame));
    const nextMedications = medicationSchedule.filter(med => !med.times.includes(currentTimeFrame));
    return [...currentMedications, ...nextMedications];
  };
  const medicationbox=sortMedicationByNextTimeFrame();
  // Function to handle setting alert time
  const handlealert = () => {
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
        notificationSound.pause();// Pause the sound
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
  const [gap,setgap]=useState('30');
  const handleSetAlertTime=()=>{
    const fromdata=new FormData();
    fromdata.append('username',userData.username);
    fromdata.append('morning',morningTime);
    fromdata.append('noon',noonTime);
    fromdata.append('night',nightTime);
    fromdata.append('gap',gap);
    axios.post('http://localhost:8000/medtime',fromdata)
    .then(response => {
      console.log('Alert time set successfully:', response.data);
    })
    .catch(error => {
      console.error('Error setting alert time:', error);
    });
    setShowModal(false);

  }
      const [body,setBody] =useState("")
      const [importFile,setImportFile] =useState("")
   
   const [search,setSearch] =useState("")
  const [following,setFollowing] =useState("")
        
  const [showMenu,setShowMenu] =useState(false)
  const [images,setImages] =  useState(null)
  const [done,setDone] =useState(false);
  const fetchdone = () => { 
    axios.get('http://127.0.0.1:8000/done',
    {
      params: {
        username: userData.username,
        date: moment().format('YYYY-MM-DD'),
        time: time
      }
    }).then((response) => {
      console.log(response.data);
      setDone(response.data.done);
    })
    .catch((error) => {
      console.log(error);
    });
  }
    useEffect(() => {
      fetchdone();
    }, [time]);
  const handlenow = () => {
    // setDone(!done);
    const formdata = new FormData();
    formdata.append('type', done?'notdone':'done');
    formdata.append('username', userData.username);
    formdata.append('date', moment().format('YYYY-MM-DD'));
    formdata.append('time',time);
    axios.post('http://127.0.0.1:8000/done', formdata)
    .then(response => {
      fetchdone();
      console.log('Medication done status updated successfully:', response.data);
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error updating medication done status:', error);
    });
  }
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
        <h4 className="headmed">Medication Schedule({moment().format('h:mm A')})</h4>
        {timebox.map((timeFrame, index) => (
         <div className="m-2 row d-flex" key={index}>
        <div className="row">
          <div className="col-md-6">
         <h5>{timeFrame}</h5>
         </div>
        <div className="col-md-6 text-right">
         {(timeFrame==time) ? (
         <input
                type="checkbox"
                className="form-check-input"
                id={"done"}
                checked={done}
                onChange={() => handlenow()}
              />
        ):<></>
         }
         </div>
          </div>
         {sortMedicationByNextTimeFrame().map((med, medIndex) => (
           med.times.includes(timeFrame) && (
             <div className="col-md-4" key={medIndex}>
               <Card className="mb-3">
                 <Card.Img src={`http://localhost:8000/${med.image}`} className="card-img-top" alt="Medication" style={{  height: '100px' }} />
                 <Card.Body>
                   <Card.Title>{med.name}</Card.Title>
                   <Card.Text>Dosage: {med.dosage}</Card.Text>
                   <Card.Text>Take: {med.after}</Card.Text>
                 </Card.Body>
               </Card>
             </div>
           )
         ))}
       </div>       
        ))}
      </div>

      <div className="med scrollable notes rounded">
  <h4 className="note">Notes</h4>
  {sortMedicationByNextTimeFrame().map((note, index) => (
    note.note !== null && (
      <div className="med notes m-2" key={index}>
        <h5>{note.name}</h5>
        <p>{note.note}</p>
      </div>
    )
  ))}
</div>
<div className="med addmed rounded scrollbox">
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
        <label className="m-1">Dosage</label>
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
                checked={newMedication[time.toLowerCase()]}
                onChange={() => handleTimeCheckboxChange(time.toLowerCase())}
              />
              <label className="m-1 form-check-label" htmlFor={time}>{time}</label>
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
      <div className="m-1 form-group">
        <label className="m-1">Start Date</label>
        <input
          type="date"
          className="m-1 form-control"
          value={newMedication.start_date}
          onChange={(e) => setNewMedication({ ...newMedication, start_date: e.target.value })}
        />
      </div>
      <div className="m-1 form-group">
        <label className="m-1">End Date</label>
        <input
          type="date"
          className="m-1 form-control"
          value={newMedication.end_date}
          onChange={(e) => setNewMedication({ ...newMedication, end_date: e.target.value })}
        />
      </div>
      <div className="m-2 form-group">
      <label>Med Image</label>
      <input
        type="file"
        accept="image/*"
        className="form-control-file"
        onChange={handleImageChange}
      />
      {image && (
        <div>
          <img src={URL.createObjectURL(image)} className="card-img-top" alt="Medication" style={{  height: '100px' }} />

        </div>
        
      )}
      </div>
      <div className="m-1 form-group">
  <label className="m-1">Take At</label>
  <select
    className="m-1 form-control"
    value={newMedication.after}
    onChange={(e) => setNewMedication({ ...newMedication, after: e.target.value })}
  >
    <option value="After Meal">After Meal</option>
    <option value="Before Meal">Before Meal</option>
  </select>
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
          <label>Morning Time (12-hour format)</label>
          <input
            type="time"
            className="form-control"
            value={morningTime}
            onChange={(e) => setMorningTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Noon Time (12-hour format)</label>
          <input
            type="time"
            className="form-control"
            value={noonTime}
            onChange={(e) => setNoonTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Night Time (12-hour format)</label>
          <input
            type="time"
            className="form-control"
            value={nightTime}
            onChange={(e) => setNightTime(e.target.value)}
          />
          </div>
           <div className="form-group">
          <label>Alert Between</label>
          <input
            type="text"
            className="form-control"
            value={gap}
            onChange={(e) => setgap(e.target.value)}
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