import "bootstrap/dist/css/bootstrap.min.css";
import { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import BootstrapNavbar from "./components/Navbar";
import StudentEvents from "./components/StudentEvents";
import ClubAdminPanel from "./components/ClubAdminPanel";
import SysAdminPanel from "./components/SysAdminPanel";
import HomePage from "./components/HomePage";

export const AppContext = createContext();

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  return (
    <AppContext.Provider value={{ userToken, setUserToken, userType, setUserType }}>
      <Router>
        <BootstrapNavbar />
        <Routes>
          {/* for unauthenticated users. contains all common data*/}
          <Route path="/" element={<HomePage />} />
          {/* see all events + registered events as student */}
          <Route path="/events" element={<StudentEvents />} />
          {/* club admin page */}
          <Route path="/clubadmin" element={<ClubAdminPanel />} />
          {/* club admin see data for an event */}
          <Route path="/clubadmin/:eventId" element={<ClubAdminPanel />} />
          {/* sys admin page */}
          <Route path="/admin" element={<SysAdminPanel />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
