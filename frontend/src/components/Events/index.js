import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "events_future").then((res) => {
      setEvents(res.data.events);
    });
  }, []);

  return (
    <>
      {events.length === 0 && <p>no registered events</p>}
      {events.length > 0 &&
        events.map((event) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{event.event_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{event.event_club}</Card.Subtitle>
              <Card.Text>{`${event.event_desc}\n\nMax Participation Limit: ${event.max_limit}`}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};
export default Events;
