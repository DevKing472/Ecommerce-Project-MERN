import { Loader } from '@/components';
import { fetcherGetAuthorized, formatAsPrice } from '@/helpers';
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

export default function AdminItems() {
  const [query, setQuery] = useState('');
  const { data, error, isLoading, isValidating } = useSWR(
    process.env.BACKEND_URL + '/products',
    fetcherGetAuthorized
  );

  const filteredProducts = useMemo(() => {
    if (!data || !data.products) return;
    return data.products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  if (error || !filteredProducts)
    return (
      <>
        <Head>
          <title>Admin | Items | Jetzt ist die beste Zeit</title>
        </Head>
        <h1>Failed to load items</h1>
      </>
    );

  return (
    <>
      <Head>
        <title>Admin | Items | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard>
        <MDBCardHeader>
          <h1>Items</h1>
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
                    <th scope="col">Name</th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      On stock
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Price
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Delivery cost
                    </th>
                    <th style={{ textAlign: 'right' }} scope="col">
                      Discount
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <MDBCheckbox />
                      </td>
                      <td>
                        <Link href={`/products/${product._id}`}>
                          {product._id}
                        </Link>
                      </td>
                      <td>
                        <Link href={`/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </td>
                      <td align="right">{product.quantityOnStock}</td>
                      <td align="right">{formatAsPrice(product.price)}</td>
                      <td align="right">
                        {formatAsPrice(product.deliveryPrice)}
                      </td>
                      <td align="right">{formatAsPrice(product.discount)}</td>
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
