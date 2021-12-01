import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';

const StudentEvents = () => {
    const [events, setEvents] = useState([]);
    const { userToken } = useContext(AppContext);

   

    useEffect(() => {
      console.log(`StudDetails ${userToken}`);
      
      axios
      .get(process.env.REACT_APP_BACKEND_URL + "events_all")
      .then((res) => {
        setEvents(res.data.events);
        console.log(res.data.events);
      });
    },[events]);

    return (
      <>
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
  export default StudentEvents;
