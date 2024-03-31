import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the image
import img3 from "../../assets/User-post/img3.jpg";

const FindF = ({fndlist,setfndlist,fnd}) => { // Destructure props to directly access userData
    const userData= JSON.parse(localStorage.getItem('userData'));

    return (
        <Card className="text-center card-box" style={{ width: '300px',height: '460px' }}> 
        <Card.Body className="member-card pt-2 pb-2">
            <div className="thumb-lg member-thumb mx-auto">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                className="rounded-circle img-thumbnail"
                alt="profile-image"
              />
            </div>
            <div>
              <h4>{fnd.first_name} {fnd.last_name}</h4>
              <p className="text-muted">
                @{fnd.username} <span> </span
                ><span><a href="#" className="text-pink"></a></span>
              </p>
            </div>
            <ul className="social-links list-inline">
              <li className="list-inline-item">
                <a
                  title=""
                  data-placement="top"
                  data-toggle="tooltip"
                  className="tooltips"
                  href=""
                  data-original-title="Facebook"
                  ><i className="fa fa-facebook"></i
                ></a>
              </li>
              <li className="list-inline-item">
                <a
                  title=""
                  data-placement="top"
                  data-toggle="tooltip"
                  className="tooltips"
                  href=""
                  data-original-title="Twitter"
                  ><i className="fa fa-twitter"></i
                ></a>
              </li>
              <li className="list-inline-item">
                <a
                  title=""
                  data-placement="top"
                  data-toggle="tooltip"
                  className="tooltips"
                  href=""
                  data-original-title="Skype"
                  ><i className="fa fa-skype"></i
                ></a>
              </li>
            </ul>
            <div>
              <Button variant="secondary" className="mt-3 btn-rounded waves-effect w-md waves-light m-1">
                Request Now
              </Button>
              <Button variant="secondary" className="mt-3 btn-rounded waves-effect w-md waves-light m-1">
                View Profile
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
};

export default FindF;
