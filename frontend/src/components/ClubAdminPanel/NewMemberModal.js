import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";

const NewMemberModal = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleAddition = useCallback(() => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@nitc.ac.in$/;
    if (!re.test(email.toLowerCase())) {
      setEmailError(true);
      return;
    }
    setEmail("");
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
  }, [email]);

  return (
    <Modal onHide={onHide} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">New Member</Modal.Title>
        <button className="btn-close" onClick={onHide} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>NITC Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmailError(false);
                setEmail(e.target.value);
              }}
              value={email}
              isInvalid={emailError}
            />
          </Form.Group>
          {emailError && <div class="alert alert-danger">Invalid user</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {loading && <Spinner animation="border" />}
        <Button onClick={handleAddition}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewMemberModal;
