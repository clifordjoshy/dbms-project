import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCallback, useContext, useState } from "react";

const VenueAddModal = () => {

  const [name, setName] = useState("");

  const userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzODI4MjE3NSwianRpIjoiYjgyNDU3N2EtOGJiZi00ODczLTk2MWMtNTY3ODI0NWU3ZTU5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkNhcGl0YWxpc3RzIiwibmJmIjoxNjM4MjgyMTc1LCJleHAiOjE2MzgzNjg1NzV9.h0LOx7E7ZiupPkpsdCPKfBQUznsYv5Qos8n9uDL9bek";

  const handleCreate = useCallback(() => {
    (e) => {
      e.preventDefault();
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "venue_add",
          {
            venue_name: name,
          },
          { headers: { Authorization: `Bearer ${userToken}` } }
        )
        .then(() => {
          setName({ ...name, name: null });
        });
    },
    [name]
  });

  return (
    <Modal.Dialog size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">New Venue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Venue Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter venue name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCreate}>Make Venue</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default VenueAddModal;