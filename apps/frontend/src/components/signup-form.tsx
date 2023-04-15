import { validateEmail } from '@/helpers';
import { useNotification, useUser } from '@/hooks';
import { Response } from '@/types';
import {
  MDBInput,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import { NextRouter } from 'next/router';
import {
  FormEvent,
  useState,
  ChangeEvent,
  useRef,
  useEffect,
  useMemo,
} from 'react';

interface Props {
  router: NextRouter;
}

export function SignUpForm({ router }: Props) {
  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    secret: '',
  };

  const [formInput, setFormInput] = useState(initialState);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { open } = useNotification();
  const { login } = useUser();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormInput((prev) => {
      return { ...prev, [name]: value };
    });
  }

  useEffect(() => {
    emailRef.current?.setCustomValidity(errors.email);
    passwordRef.current?.setCustomValidity(errors.password);
    confirmPasswordRef.current?.setCustomValidity(errors.password);
  }, [errors]);

  useMemo(() => {
    handleValidation();
  }, [formInput]);

  function handleValidation() {
    let formIsValid = true;
    let errors = {
      email: '',
      password: '',
    };

    if (!formInput.email) {
      formIsValid = false;
      errors.email = 'Cannot be empty.';
    }

    console.log('Pass: ' + formInput.password);
    console.log('ConPass: ' + formInput.confirmPassword);

    if (!validateEmail(formInput.email)) {
      formIsValid = false;
      errors.email = 'Should be a valid email address.';
    }
    if (formInput.password.length < 5 || formInput.confirmPassword.length < 5) {
      formIsValid = false;
      errors.password = 'Passwords should be longer than 5 symbols.';
    } else if (formInput.password !== formInput.confirmPassword) {
      formIsValid = false;
      errors.password = 'Passwords should match.';
    }
    console.log(errors);
    setErrors(errors);
    return formIsValid;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!handleValidation()) return;

    const body = {
      email: formInput.email,
      password: formInput.password,
      secret: formInput.secret,
    };
    const data: Response = await (
      await fetch(process.env.BACKEND_URL + '/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    ).json();
    if (!data.success || !data.user) {
      open('Error', data.message ?? 'Unknown error', 'error');
      return;
    }

    open('Success', 'Succesfully logged in');
    login({ ...data.user });
    router.push('/');
  }

  return (
    <MDBValidation onSubmit={handleSubmit} isValidated>
      <h1 className="mb-4">Sign Up</h1>
      <MDBValidationItem
        feedback={errors.email}
        invalid={errors.email.length > 0}
        className="mb-3 pb-1"
      >
        <MDBInput
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          value={formInput.email}
          label="Email address"
          minLength={5}
          onChange={handleChange}
          required
        />
      </MDBValidationItem>
      <MDBValidationItem
        feedback={errors.password}
        className="mb-3 pb-1"
        invalid={errors.password.length > 0}
      >
        <MDBInput
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          value={formInput.password}
          label="Password"
          onChange={handleChange}
          required
        />
      </MDBValidationItem>
      <MDBValidationItem
        feedback={errors.password}
        className="mb-3 pb-1"
        invalid={errors.password.length > 0}
      >
        <MDBInput
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          ref={confirmPasswordRef}
          value={formInput.confirmPassword}
          label="Confirm password"
          onChange={handleChange}
          required
        />
      </MDBValidationItem>
      <MDBInput
        type="password"
        name="secret"
        id="secret"
        value={formInput.secret}
        label="Secret"
        onChange={handleChange}
        required
      />
      <MDBBtn
        className="w-100 my-3"
        type="submit"
        disabled={
          Object.values(errors).some((item) => item.length > 1) ||
          Object.entries(formInput).some(([key, value]) => {
            if (key !== 'secret') return value.length < 1;
            return false;
          })
        }
      >
        Sign up
      </MDBBtn>
    </MDBValidation>
  );
}
