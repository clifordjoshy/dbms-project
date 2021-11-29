import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import trashIcon from "../../icons/trash.svg";
import expandIcon from "../../icons/expand.svg";
import NewMemberModal from "./NewMemberModal";
import NewEventModal from "./NewEventModal";
import { useNavigate } from "react-router-dom";

const ClubAdminPanel = () => {
  const { userToken } = useContext(AppContext);
  const [memberList, setMemberList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [description, setDescription] = useState("");
  const [storedDes, setStoredDes] = useState("");
  const [isDeletingMembers, setIsDeletingMembers] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setDescription(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sunt nesciunt similique eius possimus,\
        voluptas incidunt corrupti iure animi et."
    );
    setStoredDes(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sunt nesciunt similique eius possimus,\
        voluptas incidunt corrupti iure animi et."
    );
    // if (!userToken) {
    //   history.push("/");
    // }
    // axios
    //   .get(process.env.REACT_APP_BACKEND_URL + pollId + "/admin", {
    //     headers: { Authorization: `Bearer ${userToken}` },
    //   })
    //   .then((res) => setQuestionData(res.data))
  }, [userToken]);

  return (
    <div className="p-4 text-white">
      <h1>
        <b>{"Insert club name here"}</b>
      </h1>
      <textarea
        className="form-control bg-transparent text-white"
        rows="3"
        placeholder="<club description here>"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant={storedDes == description ? "secondary" : "info"}
        disabled={storedDes == description}
        className="float-end mt-1"
      >
        Save Changes
      </Button>
      <br />
      <br />
      <div className="collapse-cards">
        <div>
          <h3>Members</h3>
          <div className="overflow-auto" style={{ height: "500px" }}>
            {[
              "Person A",
              "Person B",
              "Person C",
              "Person B",
              "Person C",
              "Person B",
              "Person C",
              // "Person B",
              // "Person C",
              "Person B",
              // "Person C",
            ].map((name) => {
              return (
                <Card className="w-100 mb-2 text-black">
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className="float-start">B190539CS</Card.Text>
                    <Card.Text className="float-end">
                      {isDeletingMembers && <input type="image" src={trashIcon} style={{ height: "20px" }} />}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          <Button variant="success" className="float-end mt-2" onClick={() => setIsAddingMember(true)}>
            Add New Member
          </Button>
          <Button
            variant="danger"
            className="float-end mt-2 me-2"
            onClick={(e) => {
              e.preventDefault();
              setIsDeletingMembers(!isDeletingMembers);
            }}
          >
            {isDeletingMembers ? "Return" : "Delete Members"}
          </Button>
        </div>
        <div>
          <h3>Events</h3>
          <div className="overflow-auto" style={{ height: "500px" }}>
            {["Event A", "Event B"].map((name) => {
              return (
                <Card className="w-100 mb-2 text-black">
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className="float-start m-0">
                      ECLC
                      <br />
                      Friday 10:30pm
                    </Card.Text>
                    <input
                      type="image"
                      src={expandIcon}
                      className="float-end"
                      style={{ height: "20px" }}
                      onClick={() => navigate(`${1}`)}
                    />
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          <Button variant="success" className="float-end mt-2" onClick={() => setIsCreatingEvent(true)}>
            Create New Event
          </Button>
        </div>
      </div>
      <NewMemberModal show={isAddingMember} onHide={() => setIsAddingMember(false)} />
      <NewEventModal show={isCreatingEvent} onHide={() => setIsCreatingEvent(false)} />
    </div>
  );
};
export default ClubAdminPanel;
