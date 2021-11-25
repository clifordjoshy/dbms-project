import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const { userToken, setUserToken } = useContext(AppContext);
  const { userType, setUserType } = useContext(AppContext);

  const [showLoginModal, setShowLoginModal] = useState(false);

  let navOptions;
  if (!userToken) {
    navOptions = (
      <>
        <Nav.Link onClick={() => setShowLoginModal(true)}>
          <Button variant="primary">Sign In</Button>
        </Nav.Link>
      </>
    );
  } else {
    navOptions = (
      <>
        <Nav.Link
          className="d-flex align-items-center"
          onClick={() => {
            localStorage.removeItem("userToken");
            setUserToken(null);
          }}
        >
          Log Out
        </Nav.Link>
        {/* add other options based on user type */}
      </>
    );
  }

  return (
    <>
      <BootstrapNavbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <BootstrapNavbar.Brand style={{ cursor: "pointer" }}>
            <b>NITC CMS</b>
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
          <BootstrapNavbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>{navOptions}</Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
      {!userToken && <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />}
    </>
  );
};

export default Navbar;
