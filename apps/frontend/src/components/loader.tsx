import { MDBContainer, MDBSpinner } from 'mdb-react-ui-kit';

export function Loader() {
  return (
    <MDBContainer
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <MDBSpinner
        grow
        color="primary"
        style={{ width: '5rem', height: '5rem' }}
      />
      <MDBSpinner
        grow
        color="muted"
        style={{ width: '5rem', height: '5rem' }}
      />
      <MDBSpinner
        grow
        color="secondary"
        style={{ width: '5rem', height: '5rem' }}
      />
    </MDBContainer>
  );
}
