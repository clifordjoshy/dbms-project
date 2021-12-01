import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCallback, useState } from "react";
import axios from "axios";

const ClubAddModal = () => {
  const [name, setName] = useState("");
  const [pword, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzODI4MjE3NSwianRpIjoiYjgyNDU3N2EtOGJiZi00ODczLTk2MWMtNTY3ODI0NWU3ZTU5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkNhcGl0YWxpc3RzIiwibmJmIjoxNjM4MjgyMTc1LCJleHAiOjE2MzgzNjg1NzV9.h0LOx7E7ZiupPkpsdCPKfBQUznsYv5Qos8n9uDL9bek";

  const handleCreate = useCallback(() => {
    const errorsNew = {};
    
    errorsNew.name = false;
    if (pword.length < 6) {
      errorsNew.pword = true;
    }

    if (errorsNew.name || errorsNew.pword) {
      setErrors(errorsNew);
      return;
    }

    axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "club_add",
          {
            club_name: name,
            password: pword,
            club_desc: ""
          },
          { headers: { Authorization: `Bearer ${userToken}` } }
        )
        .then(() => {
          setName({ ...name, name: null });
          setPassword({...pword, pword: null});
        });
    }, [name, pword]);

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
              value={pword}
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
