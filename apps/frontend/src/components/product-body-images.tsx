import Image from 'next/image';
import { MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Product as IProduct } from '@/types';

interface Props {
  product: IProduct;
}

export function ProductBodyImages({ product }: Props) {
  return (
    <MDBCardBody>
      <MDBRow className="row-cols-1 row-cols-md-3">
        {product.subImages.map((image, index) => {
          return (
            <MDBCol
              key={index}
              className="position-relative"
              style={{ height: '300px' }}
            >
              <Image
                src={image}
                alt={`${product.name}-sub-image-${index}`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </MDBCol>
          );
        })}
      </MDBRow>
    </MDBCardBody>
  );
}
