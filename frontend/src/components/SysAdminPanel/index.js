import { Button } from 'react-bootstrap';

const SysAdminPanel = () => {
  return (
    <>
      <Button style={{marginLeft: "33em", marginTop: "15em"}} onClick={() =>  window.location.href='/admin/createclub'}>Create Club</Button>
      <Button style={{marginLeft: "5em", marginTop: "15em"}} onClick={() =>  window.location.href='/admin/createvenue'}>Create Venue</Button>
    </>
  );
};

export default SysAdminPanel;