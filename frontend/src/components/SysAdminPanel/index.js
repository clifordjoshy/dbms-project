import { Button } from 'react-bootstrap';

const SysAdminPanel = () => {
  return (
    <>
      <div class="text-center">
      <Button style={{marginTop:"15%"}} onClick={() =>  window.location.href='/admin/createclub'}>Create Club</Button>
      <Button style={{marginTop:"15%", marginLeft:"40px"}} onClick={() =>  window.location.href='/admin/createvenue'}>Create Venue</Button>
      </div>
    </>
  );
};

export default SysAdminPanel;