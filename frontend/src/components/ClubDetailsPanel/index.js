import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import expandIcon from "../../icons/expand.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClubDetailsPanel = () => {
  const [clubInfo, setClubInfo] = useState(null);
  const userToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzODI4MjE3NSwianRpIjoiYjgyNDU3N2EtOGJiZi00ODczLTk2MWMtNTY3ODI0NWU3ZTU5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkNhcGl0YWxpc3RzIiwibmJmIjoxNjM4MjgyMTc1LCJleHAiOjE2MzgzNjg1NzV9.h0LOx7E7ZiupPkpsdCPKfBQUznsYv5Qos8n9uDL9bek";
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "clubs/<club_name>", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setClubInfo(res.data.info);
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
              {clubInfo?.members.map(({ name, position }) => {
                return (
                  <Card className="w-100 mb-2 text-black">
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text className="float-start">{position}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
          <div>
            <h3>Events</h3>
            <div className="overflow-auto" style={{ height: "500px", width: "700px" }}>
              {clubInfo?.events.map(({ event_name, date, slot, event_id }) => {
                return (
                  <Card className="w-100 mb-2 text-black">
                    <Card.Body>
                      <Card.Title>{event_name}</Card.Title>
                      <Card.Text className="float-start m-0">
                        {date.substring(0, date.indexOf("00:00:00"))}
                        <br />
                        {slot}
                      </Card.Text>
                      <input
                        type="image"
                        src={expandIcon}
                        className="float-end"
                        style={{ height: "20px" }}
                        onClick={() => navigate(`${event_id}`)}
                      />
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ClubDetailsPanel;
