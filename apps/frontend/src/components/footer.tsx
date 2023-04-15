import { MDBContainer, MDBFooter, MDBIcon } from 'mdb-react-ui-kit';
import Link from 'next/link';

export function Footer() {
  return (
    <MDBFooter bgColor="secondary">
      <MDBContainer className="text-center p-3">
        <Link className="text-light" href="https://github.com/nelfimov/">
          <MDBIcon icon="github" fab size="3x" alt="github" />
        </Link>
      </MDBContainer>
    </MDBFooter>
  );
}
