import useSWR from 'swr';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { CartItem, Product } from '@/types';
import { fetcherGetUnauthorized, formatAsPrice } from '@/helpers';
import { ItemList, Loader } from '@/components';
import { useCart } from '@/hooks';

export default function Cart() {
  const cart = useCart();
  const url = `${process.env.BACKEND_URL}/products?ids=${JSON.stringify(
    cart.cartItems.map((item) => item.id)
  )}`;
  const { data, error, isLoading, isValidating } = useSWR(
    url,
    fetcherGetUnauthorized
  );

  useEffect(() => {
    if (!data || !data.products || data.products.length < 1) return;
    cart.updatePrices(data.products);
  }, [data]);

  if (error)
    return (
      <>
        <Head>
          <title>Cart | Jetzt ist die beste Zeit</title>
        </Head>
        <h1>Failed to load cart</h1>
      </>
    );

  return (
    <>
      <Head>
        <title>Cart | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard>
        <MDBCardHeader>
          <h1>Cart</h1>
        </MDBCardHeader>
        {cart.itemCount === 0 ? (
          <MDBCardBody>
            <h4 style={{ textAlign: 'center' }}>Empty</h4>
          </MDBCardBody>
        ) : (
          <MDBCardBody>
            {isLoading || isValidating ? (
              <Loader />
            ) : (
              <MDBTable responsive="sm" striped hover>
                <MDBTableHead light>
                  <tr>
                    <th
                      style={{ textAlign: 'center', width: '10px' }}
                      scope="col"
                    >
                      #
                    </th>
                    <th style={{ textAlign: 'center' }} scope="col">
                      Name
                    </th>
                    <th style={{ textAlign: 'center' }} scope="col">
                      Quantity
                    </th>
                    <th style={{ textAlign: 'center' }} scope="col">
                      Price
                    </th>
                    <th style={{ textAlign: 'center' }} scope="col">
                      Total amount
                    </th>
                    <th
                      style={{ textAlign: 'center', width: '150px' }}
                      scope="col"
                    >
                      Delete?
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {data &&
                    data.products &&
                    data.products.map((product: Product, index: number) => (
                      <ItemList
                        key={product._id}
                        product={product}
                        index={index + 1}
                        quantity={
                          cart.cartItems.filter(
                            (item: CartItem) => item.id === product._id
                          )[0].quantity
                        }
                      />
                    ))}
                </MDBTableBody>
                <tfoot>
                  <tr className="table-secondary">
                    <td colSpan={5} align="right">
                      Total items:
                    </td>
                    <td align="center">{formatAsPrice(cart.totalItems)}</td>
                  </tr>
                  <tr className="table-secondary">
                    <td colSpan={5} align="right">
                      Total discounts:
                    </td>
                    <td align="center">
                      -{formatAsPrice(cart.totalDiscounts)}
                    </td>
                  </tr>
                  <tr className="table-secondary">
                    <td colSpan={5} align="right">
                      Total shipping:
                    </td>
                    <td align="center">
                      +{formatAsPrice(cart.totalShippings)}
                    </td>
                  </tr>
                  <tr className="table-info fw-bold">
                    <td colSpan={5} align="right">
                      TOTAL:
                    </td>
                    <td align="center">{formatAsPrice(cart.totalCart)}</td>
                  </tr>
                </tfoot>
              </MDBTable>
            )}
          </MDBCardBody>
        )}
        {cart.itemCount > 0 && (
          <MDBCardFooter>
            <MDBRow className="row-cols-1 row-cols-sm-2 g-4">
              <Link href="/" className="d-flex">
                <MDBBtn className="flex-fill" color="secondary">
                  Continue shopping
                </MDBBtn>
              </Link>
              <Link href="/cart/checkout" className="d-flex">
                <MDBBtn color="success" className="flex-fill">
                  To checkout
                </MDBBtn>
              </Link>
            </MDBRow>
          </MDBCardFooter>
        )}
      </MDBCard>
    </>
  );
}
