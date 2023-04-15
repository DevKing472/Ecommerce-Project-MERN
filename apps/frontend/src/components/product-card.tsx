import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTypography,
} from 'mdb-react-ui-kit';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <MDBCard className="p-0">
      <Link
        className="card-link"
        href={`/products/${encodeURIComponent(product._id)}`}
      >
        <div
          className="card-img-top"
          style={{ position: 'relative', height: '200px' }}
        >
          <Image
            className="card-img-top"
            src={product.titleImage}
            alt={`${product.name}-title-image`}
            fill
          />
        </div>
        <MDBCardBody>
          <MDBCardTitle>{product.name}</MDBCardTitle>
          {product.deliveryPrice > 0 ? (
            <>
              <MDBCardTitle>
                <MDBTypography tag="s">
                  €{(product.price + product.deliveryPrice).toFixed(2)}
                </MDBTypography>
              </MDBCardTitle>
              <MDBCardTitle style={{ color: 'red' }}>
                <MDBTypography>€{product.totalPrice.toFixed(2)}</MDBTypography>
              </MDBCardTitle>
            </>
          ) : (
            <MDBCardTitle>€{product.totalPrice.toFixed(2)}</MDBCardTitle>
          )}
        </MDBCardBody>
      </Link>
    </MDBCard>
  );
}
