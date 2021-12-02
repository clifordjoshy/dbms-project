import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';
import { useCallback } from 'react';


const StudentEvents = () => {
    const [events, setEvents] = useState([]);
    const [regEvents, setRegEvents] = useState([]);
    const { userToken } = useContext(AppContext);

    const [unregEvents, setUnRegEvents] = useState([]);
    const [isRegistering, setIsRegistering] = useState(false);

   
    

    //get the events the student is registered to
    useEffect(() => {
      axios
      .get(process.env.REACT_APP_BACKEND_URL + "events_student", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setRegEvents(res.data.events);

        // let temp = [];
        // regEvents.forEach((event) => temp.push(event.event_id));
        // setRegNum(temp);
        console.log(regEvents);
      });
    },[isRegistering]);

    //get other events
    useEffect(() => {
      
      axios
      .get(process.env.REACT_APP_BACKEND_URL + "events_future")
      .then((res) => {
        setEvents(res.data.events);
      });

    },[]);

    //compute unreg
    useEffect(() => {
      let temp = [];
      regEvents.forEach((event) => temp.push(event.event_id));
      
      let temp_events = [];
      events.forEach((event) => {
        if(!temp.includes(event.event_id)){
          temp_events.push(event);
        }
      });

      setUnRegEvents(temp_events);
    },[events,regEvents]);

    //Register --works
    function handleRegister(event,index) {
      console.log(userToken);
        axios
          .post(
            process.env.REACT_APP_BACKEND_URL + "event_register",
            {
              event_id: event.event_id
            },
            { headers: { Authorization: `Bearer ${userToken}` } }
          )
          .then(() => {
            setIsRegistering(!isRegistering);
          });
      }



    

    return (
      <>
        <h1>Registered Events</h1>
        {regEvents.length === 0 && <p>no registered events</p>}
        {regEvents.length > 0 && regEvents.map((event)=> (
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
        <h1>Other Events</h1>
        {unregEvents.length === 0 && <p>no registered events</p>}
        {unregEvents.length > 0 && unregEvents.map((event,index) => (
            <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{event.event_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{event.event_club}</Card.Subtitle>
              <Card.Text>
                {`${event.event_desc}\n\nMax Participation Limit: ${event.max_limit}`}
              </Card.Text>
              <Button variant="primary" onClick={() => handleRegister(event,index)}>Register</Button>
            </Card.Body>
          </Card>
        )
        )}
      </>
    );
  };
  export default StudentEvents;
