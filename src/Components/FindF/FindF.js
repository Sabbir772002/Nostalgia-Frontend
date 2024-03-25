import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem, 
  MDBBadge, 
  MDBBtn,
  MDBRow
} from 'mdb-react-ui-kit';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import "./FindF.css"


const FindF = (val) => {



  return (
    <div className='Find'>
       <MDBRow>
      <MDBCol xl={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <img
                  src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>John Doe</p>
                  <p className='text-muted mb-0'>john.doe@gmail.com</p>
                </div>
              </div>
              <MDBBadge pill color='success' light>
                Active
              </MDBBadge>
            </div>
          </MDBCardBody>
          <MDBCardFooter background='light' border='0' className='p-2 d-flex justify-content-around'>
            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'>
              Message <MDBIcon fas icon='envelope' />
            </MDBBtn>
            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'>
              Call <MDBIcon fas icon='phone' />
            </MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <img
                  src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>Alex Ray</p>
                  <p className='text-muted mb-0'>alex.ray@gmail.com</p>
                </div>
              </div>
              <MDBBadge pill color='primary' light>
                Onboarding
              </MDBBadge>
            </div>
          </MDBCardBody>
          <MDBCardFooter background='light' border='0' className='p-2 d-flex justify-content-around'>
            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'>
              Message <MDBIcon fas icon='envelope' />
            </MDBBtn>
            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'>
              Call <MDBIcon fas icon='phone' />
            </MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <img
                  src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>Kate Hunington</p>
                  <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
                </div>
              </div>
              <MDBBadge pill color='warning' light>
                Awaiting
              </MDBBadge>
            </div>
          </MDBCardBody>
          <MDBCardFooter background='light' border='0' className='p-2 d-flex justify-content-around'>
            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'>
              Message <MDBIcon fas icon='envelope' />
            </MDBBtn>
            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'>
              Call <MDBIcon fas icon='phone' />
            </MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
      <MDBCol xl={6} className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <img
                  src='https://mdbootstrap.com/img/new/avatars/3.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>Michael Bale</p>
                  <p className='text-muted mb-0'>michael.bale@gmail.com</p>
                </div>
              </div>
              <MDBBadge pill color='danger' light>
                Removed
              </MDBBadge>
            </div>
          </MDBCardBody>
          <MDBCardFooter background='light' border='0' className='p-2 d-flex justify-content-around'>
            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'>
              Message <MDBIcon fas icon='envelope' />
            </MDBBtn>
            <MDBBtn color='link' rippleColor='primary' className='text-reset m-0'>
              Call <MDBIcon fas icon='phone' />
            </MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  
    </div>
    
  )
}

export default FindF