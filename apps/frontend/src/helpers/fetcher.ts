import { IUserContext } from '@/context';
import { Address, Response } from '@/types';
import { Fetcher } from 'swr';

export const fetcherGetUnauthorized: Fetcher<Response, string> = (url) =>
  fetch(url).then((res) => res.json());

export const fetcherGetAuthorized: Fetcher<Response, string> = (url) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

export const fetcherPostAuthorized: Fetcher<Response, string> = (url) =>
  fetch(url, { method: 'POST', credentials: 'include' }).then((res) =>
    res.json()
  );

interface CreateAddressArgs {
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  zip: string;
  country: string;
  fullName: string;
  email: string;
}

export async function createAddress({
  street,
  city,
  zip,
  country,
  fullName,
  email,
  type,
}: CreateAddressArgs): Promise<Response> {
  return await (
    await fetch('http://localhost:3001/addresses/', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        street,
        city,
        zip,
        country,
        fullName,
        type,
        email,
      }),
    })
  ).json();
}

export async function registerAnonUser(user: IUserContext) {
  const response: Response = await (
    await fetch('http://localhost:3001/auth/register-anon/', {
      credentials: 'include',
    })
  ).json();
  if (response.user) user.login(response.user);
  return response.success;
}

export async function addAddressesToOrder(
  orderID: string,
  shippingAddress: Address,
  billingAddress: Address
) {
  const response: Response = await (
    await fetch(`http://localhost:3001/orders/${orderID}/address`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        shippingAddress,
        billingAddress,
      }),
    })
  ).json();

  return response.success
    ? { success: response.success }
    : { success: response.success, message: response.message };
}
