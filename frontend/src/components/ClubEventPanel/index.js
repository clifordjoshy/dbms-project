import { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const ClubEventPanel = () => {
  const [eventName, setEventName] = useState("default event name");
  const [eventVenue, setEventVenue] = useState("");
  const [eventTime, setEventTime] = useState("");

  return (
    <div className="collapse-cards p-4 text-black">
      <div>
        <Card body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter event title</Form.Label>
              <Form.Control
                as="input"
                placeholder="Event name goes here"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
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
            <Form.Group className="mb-3">
              <Form.Label>Pick Time Slot</Form.Label>
              <Form.Select>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Card>
        <br />
        <br />
        <h3 className="text-white">Total Number of regs : 250</h3>
      </div>
      <div>
        <h3 className="text-white">Registrations</h3>
        <div className="overflow-auto" style={{ height: "calc(100vh - 200px)" }}>
          {[
            "Person A",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
            "Person B",
          ].map((name) => {
            return (
              <Card className="w-100 mb-2 text-black" body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className="float-start m-0">person@nitc.ac.in</Card.Text>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ClubEventPanel;
