import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ClubDetailsPanel = () => {
    return (
      <>
        <div className="p-4 text-white" style={{height:"100vh"}}>
      <h1>
        <b>{"Insert club name here"}</b>
      </h1>
      <p className="form-control bg-transparent text-white">Club description here</p>
      <Button variant="success" className="mt-2" onClick = {() => "chuck if not used"}>View events by this club</Button>
      <br />
      <br />
      <div className="collapse-cards" style={{height: "80vh", display: "flex"}}>
        <div>
          <h3>Members</h3>
          <div className="overflow-auto" style={{ height: "500px", width: "600px"}}>
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