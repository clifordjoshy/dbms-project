import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCallback, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";
import { AppContext } from "../../App";

const NewEventModal = ({ show, onHide }) => {
  const [eventName, setEventName] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCreation = useCallback(() => {
    setEventName("");
    setEventVenue("");
    setEventTime("");
    onHide();
    // setLoading(true);
    // axios.post(process.env.REACT_APP_BACKEND_URL + "login", { username: email, password }).then((res) => {
    //   setLoading(false);
    //   if (res.data.access_token) {
    //     setUserToken(res.data.access_token);
    //     if (remember) {
    //       setUserToken(res.data.access_token);
    //     }
    //     onHide();
    //   } else {
    //     setErrors({ login: true });
    //   }
    // });
  }, []);

  return (
    <Modal onHide={onHide} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">New Member</Modal.Title>
        <button className="btn-close" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter event title</Form.Label>
            <Form.Control
              as="input"
              placeholder="Event name goes here"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              isInvalid={errors.eventName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pick Event Venue</Form.Label>
            <Form.Select>
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
          <Row className="g-2 mb-3">
            <Col md>
              <Form.Group>
                <Form.Label>Enter event date</Form.Label>
                <Form.Control
                  type="date"
                  value={eventTime.slice(0, 10)}
                  onChange={(e) => setEventTime(e.target.value + "T" + eventTime.slice(10))}
                  isInvalid={errors.time}
                />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>Enter event time</Form.Label>
                <Form.Control
                  type="time"
                  value={eventTime.slice(11)}
                  onChange={(e) => setEventTime(eventTime.slice(0, 10) + "T" + e.target.value)}
                  isInvalid={errors.time}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {loading && <Spinner animation="border" />}
        <Button onClick={handleCreation}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEventModal;
