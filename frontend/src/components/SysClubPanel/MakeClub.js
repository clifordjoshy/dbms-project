import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../App";

const ClubAddModal = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { setUserToken } = useContext(AppContext);

  const handleCreate = useCallback(() => {
    const errorsNew = {};
    
    errorsNew.name = false;
    if (password.length < 6) {
      errorsNew.password = true;
    }

    if (errorsNew.name || errorsNew.password) {
      setErrors(errorsNew);
      return;
    }
  }, [name, password, setUserToken]);

  return (
    <Modal.Dialog size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">New Club</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Club Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter club name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              isInvalid={errors.name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              isInvalid={errors.password}
            />
          </Form.Group>
          {errors.add && <div class="alert alert-danger">Invalid username or password</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCreate}>Make Club</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default ClubAddModal;
