import { LogInForm, SignUpForm } from '@/components';
import { MDBBtnGroup, MDBCard, MDBRadio } from 'mdb-react-ui-kit';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';

export default function Auth() {
  const [showSignUp, setShowSignUp] = useState(true);
  const router = useRouter();
  const signUp = useRef<HTMLInputElement>(null);

  return (
    <>
      <Head>
        <title>Authorize | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard className="p-4 col-12 col-sm-10 col-md-8 mx-auto">
        <MDBBtnGroup className="mx-auto mb-4">
          <MDBRadio
            inputRef={signUp}
            btn
            btnColor="secondary"
            id="sign-up-check"
            name="options"
            wrapperTag="span"
            label="Sign up"
            defaultChecked
            onClick={() => {
              setShowSignUp(true);
            }}
          />
          <MDBRadio
            btn
            btnColor="secondary"
            id="log-in-check"
            name="options"
            wrapperTag="span"
            label="Log in"
            onClick={() => {
              setShowSignUp(false);
            }}
          />
        </MDBBtnGroup>
        {showSignUp ? (
          <SignUpForm router={router} />
        ) : (
          <LogInForm router={router} />
        )}
      </MDBCard>
    </>
  );
}
