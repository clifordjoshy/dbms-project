import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';



const StudentDetails = () => {


    const [student, setStudent] = useState({});
    const [events, setEvents] = useState([]);
    const { userToken } = useContext(AppContext);

    // useEffect(() => {
    //     axios
    //   .get(process.env.REACT_APP_BACKEND_URL + "club_info", {
    //     headers: { Authorization: `Bearer ${userToken}` },
    //   })
    //   .then((res) => {
    //     setClubInfo(res.data.info);
    //     setDescription(res.data.info.club_desc);
    //   });
    // });

    useEffect(() => {
        axios
      .get(process.env.REACT_APP_BACKEND_URL + "/events_student", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setEvents(res.data.events);
        console.log(res.data.events);
      });
    },[events]);

    return (
      <>
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>Student Details</Card.Title>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
        </Card.Body>
        </Card>
        {events.length === 0 && <p>no registered events</p>}
        {events.length > 0 && events.map((event)=> (
            <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{event.event_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{event.event_club}</Card.Subtitle>
              <Card.Text>
                {`${event.event_desc}\n\nMax Participation Limit: ${event.max_limit}`}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  };
  export default StudentDetails;
  