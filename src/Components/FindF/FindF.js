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
       <Row>
  <Col sm="6">
    <Card body>
      <CardTitle tag="h5">
        Special Title Treatment
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
  </Col>
  <Col sm="6">
    <Card body>
      <CardTitle tag="h5">
        Special Title Treatment
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Go somewhere
      </Button>
    </Card>
  </Col>
</Row>
  
    </div>
    
  )
}

export default FindF