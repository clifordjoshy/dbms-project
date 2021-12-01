import Card from "react-bootstrap/Card";
import { useContext, useEffect, useState } from "react";
import expandIcon from "../../icons/expand.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const ClubDetailsPanel = () => {
  const {clubname} = useParams();
  const [clubInfo, setClubInfo] = useState(null);

  useEffect(() => {
    console.log('hollaaa');
    console.log(clubname);
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `clubs/${clubname}`)
      .then((res) => {
        setClubInfo(res.data.info);
        console.log(res.data.info);
      });
  });

  return (
    <>
      <div className="p-4 text-white" style={{ height: "100vh" }}>
        <h1>
          <b>{clubInfo?.club_name}</b>
        </h1>
        <p className="form-control bg-transparent text-white">{clubInfo?.club_desc}</p>
        <br />
        <br />
        <div className="collapse-cards" style={{ height: "80vh", display: "flex" }}>
          <div>
            <h3>Members</h3>
            <div className="overflow-auto" style={{ height: "500px", width: "700px" }}>
              {clubInfo?.members.map(({ name, position }) =>  (
                  <Card className="w-100 mb-2 text-black">
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text className="float-start">{position}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              }
            </div>
          </div>
          <div>
            <h3>Events</h3>
            <div className="overflow-auto" style={{ height: "500px", width: "700px" }}>
              {clubInfo?.events.map(({ event_name, date, slot, event_id }) => (
                  <Card className="w-100 mb-2 text-black">
                    <Card.Body>
                      <Card.Title>{event_name}</Card.Title>
                      <Card.Text className="float-start m-0">
                        {date.substring(0, date.indexOf("00:00:00"))}
                        <br />
                        {slot}
                      </Card.Text>
                      {/* <input
                        type="image"
                        src={expandIcon}
                        className="float-end"
                        style={{ height: "20px" }}
                        onClick={() => navigate(`${event_id}`)}
                      /> */}
                    </Card.Body>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClubDetailsPanel;
