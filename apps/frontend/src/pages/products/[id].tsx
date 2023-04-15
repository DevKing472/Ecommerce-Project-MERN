import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MDBCard } from 'mdb-react-ui-kit';
import { fetcherGetUnauthorized } from '@/helpers';
import { Loader, ProductBodyImages, ProductHeader } from '@/components';
import { useUser } from '@/hooks';

export default function Product() {
  const { isAdmin } = useUser();
  const { isReady, query } = useRouter();
  const { data, error, isLoading, isValidating } = useSWR(
    isReady ? `${process.env.BACKEND_URL}/products/${query.id}` : null,
    fetcherGetUnauthorized
  );
  const product =
    !isLoading && !isValidating && data ? data.product : undefined;

  return (
    <>
      <Head>
        <title>{`${
          product ? product.name : 'Loading'
        } | Jetzt ist die beste Zeit Online Shop`}</title>
      </Head>
      <MDBCard>
        {error && <h1>Product not found</h1>}
        {!product ? (
          <Loader />
        ) : (
          data && (
            <>
              <ProductHeader product={product} isAdmin={isAdmin} />
              <ProductBodyImages product={product} />
            </>
          )
        )}
      </MDBCard>
    </>
  );
}
