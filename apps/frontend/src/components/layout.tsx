import { MDBContainer } from 'mdb-react-ui-kit';
import { PropsWithChildren } from 'react';
import { Navbar, Footer } from './index';

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>
        <MDBContainer
          breakpoint="lg"
          className="mt-5 mb-3"
          style={{ minHeight: '79.5vh' }}
        >
          {children}
        </MDBContainer>
      </main>
      <Footer />
    </>
  );
}
