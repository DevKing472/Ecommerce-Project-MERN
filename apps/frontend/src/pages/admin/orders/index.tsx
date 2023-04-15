import { Loader } from '@/components';
import { fetcherGetAuthorized } from '@/helpers';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBTable,
  MDBTableHead,
  MDBInput,
  MDBTableBody,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

export default function AdminOrders() {
  const [query, setQuery] = useState('');
  const { data, error, isLoading, isValidating } = useSWR(
    process.env.BACKEND_URL + '/admin/orders',
    fetcherGetAuthorized
  );

  const filteredOrders = useMemo(() => {
    if (!data || !data.orders) return;
    return data.orders.filter((order) =>
      order.user.email.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  if (error || !filteredOrders)
    return (
      <>
        <Head>
          <title>Admin | Orders | Jetzt ist die beste Zeit</title>
        </Head>
        <h1>Failed to load orders</h1>
      </>
    );

  return (
    <>
      <Head>
        <title>Admin | Orders | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard>
        <MDBCardHeader>
          <h1>Orders</h1>
        </MDBCardHeader>
        <MDBCardBody>
          {isLoading || isValidating ? (
            <Loader />
          ) : (
            <>
              <MDBInput
                label="Search"
                className="mb-3"
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <MDBTable responsive="sm" striped hover align="middle">
                <MDBTableHead light>
                  <tr>
                    <th scope="col" style={{ width: '30px' }}>
                      <MDBCheckbox />
                    </th>
                    <th
                      scope="col"
                      style={{ width: '50px', padding: 'auto 0' }}
                    >
                      id
                    </th>
                    <th scope="col">User</th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Status
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Is ordered
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Payment
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Shipping address
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Billing address
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Created at
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Updated at
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <MDBCheckbox />
                      </td>
                      <td>
                        <Link href={`/admin/orders/${order._id}`}>
                          {order._id}
                        </Link>
                      </td>
                      <td>
                        <Link href={`/admin/users/${order.user._id}`}>
                          {order.user.isAnon
                            ? order.user._id
                            : order.user.email}
                        </Link>
                      </td>
                      <td align="right">{order.status}</td>
                      <td align="right">{order.isOrdered}</td>
                      <td align="right">{order.payment}</td>
                      <td align="right">{order.addressShipping}</td>
                      <td align="right">{order.addressBilling}</td>
                      <td align="right">{order.createdAt.toISOString()}</td>
                      <td align="right">{order.updatedAt.toISOString()}</td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
