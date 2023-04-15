import { useNotification, useUser } from '@/hooks';
import { MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { NextRouter } from 'next/router';
import { FormEvent } from 'react';

interface Props {
  router: NextRouter;
}

export function LogInForm({ router }: Props) {
  const { login } = useUser();
  const { open } = useNotification();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { value: email } = document.getElementById(
      'email'
    ) as HTMLInputElement;
    const { value: password } = document.getElementById(
      'password'
    ) as HTMLInputElement;

    if (!email || !password) {
      return console.error('Email or password not provided');
    }

    const body = { email, password };
    const data = await (
      await fetch(process.env.BACKEND_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      })
    ).json();
    console.log(data);
    if (!data.success) {
      open('Error', data.message, 'error');
      return;
    }
    login({ ...data.user });
    open('Success', 'Successfully logged in');
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-4">Log In</h1>
      <MDBInput
        className="mb-4"
        type="email"
        name="email"
        id="email"
        label="Email address"
        required
      />
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        id="password"
        label="Password"
        required
      />
      <MDBCheckbox name="remember" label="Remember me" id="remember" />
      <MDBBtn className="w-100 my-3" type="submit">
        Log in
      </MDBBtn>
    </form>
  );
}
