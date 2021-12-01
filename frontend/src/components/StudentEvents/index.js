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

    var regNum = [];

   

    useEffect(() => {

      console.log(`StudDetails ${userToken}`);
      
      axios
      .get(process.env.REACT_APP_BACKEND_URL + "events_all")
      .then((res) => {
        setEvents(res.data.events);
      });

    },[]);

    useEffect(() => {
      axios
      .get(process.env.REACT_APP_BACKEND_URL + "events_student", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setRegEvents(res.data.events);
        if(regEvents.length > 0){
          regEvents.forEach((event) => regNum.push(event.id));
        }
        
      });
    },[regEvents]);

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
            let temp = regEvents;
            temp[index] = temp[temp.length-1];
            console.log(temp);
            temp.pop();
            setRegEvents(temp);
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
        {events.length === 0 && <p>no registered events</p>}
        {events.length > 0 && events.filter(event => !(regNum.includes(event.id))).map((event,index) => (
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
