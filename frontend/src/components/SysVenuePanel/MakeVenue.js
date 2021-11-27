import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../App";

const VenueAddModal = () => {
  const [name, setName] = useState("");

  const { setUserToken } = useContext(AppContext);

  const handleCreate = useCallback(() => {
    
  }, [name, setUserToken]);

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
