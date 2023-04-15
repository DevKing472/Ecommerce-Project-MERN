import useSWR from 'swr';
import Head from 'next/head';
import { fetcherGetUnauthorized } from '@/helpers';
import { Loader, ProductCard } from '@/components';
import { MDBCol, MDBRow } from 'mdb-react-ui-kit';

export default function Products() {
  const { data, error, isLoading, isValidating } = useSWR(
    process.env.BACKEND_URL + '/products',
    fetcherGetUnauthorized
  );

  if (error) return <h1>Failed to load products</h1>;

  const products =
    !isLoading && !isValidating && data ? data.products : undefined;

  return (
    <>
      <Head>
        <title>Catalogue | Jetzt ist die beste Zeit Online Shop</title>
      </Head>
      <MDBRow className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {!products ? (
          <Loader />
        ) : (
          products.map((product: any) => (
            <MDBCol key={product._id}>
              <ProductCard product={product} />
            </MDBCol>
          ))
        )}
      </MDBRow>
    </>
  );
}
