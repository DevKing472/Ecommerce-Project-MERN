import { formatAsPrice } from '@/helpers';
import { useNotification } from '@/hooks';
import { Response } from '@/types';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from 'mdb-react-ui-kit';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import imageCompression, { Options } from 'browser-image-compression';

export default function NewItem() {
  const { open } = useNotification();
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '0',
    delivery: '0',
    stock: '',
    titleImage: {} as FileList,
    otherImages: {} as FileList,
  });

  const calculateTotalPrice = useMemo(
    () =>
      Number(formData.price) -
      Number(formData.discount) +
      Number(formData.delivery),

    [formData.price, formData.discount, formData.delivery]
  );

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.type === 'file'
          ? (event.target as HTMLInputElement).files
          : event.target.value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      if (Object.values(formData).some((i) => i === '')) {
        open('Failure', 'Form is not filled fully', 'error');
        return;
      }

      const options: Options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedTitleImage = await imageCompression(
        formData.titleImage[0],
        options
      );

      const arrayOfFiles = [];
      for (let file of formData.otherImages) {
        arrayOfFiles.push(imageCompression(file, options));
      }

      const result = await Promise.all(arrayOfFiles);

      const body = new FormData();

      Object.entries(formData).forEach((value) => {
        const key = value[0].toString();
        const v = value[1];
        switch (key) {
          case 'otherImages':
            for (let i of result) {
              body.append(
                `${key}`,
                i,
                `${new Date().toISOString()}-other-${result.indexOf(
                  i
                )}${formData.name.replace(' ', '')}.${i.type.split('/')[1]}`
              );
            }
            break;
          case 'titleImage':
            body.append(
              key,
              compressedTitleImage,
              `${new Date().toISOString()}-title-${formData.name.replace(
                ' ',
                ''
              )}.${compressedTitleImage.type.split('/')[1]}`
            );
            break;
          default:
            body.append(key, v.toString());
        }
      });

      const data: Response = await (
        await fetch(process.env.BACKEND_URL + '/products', {
          method: 'POST',
          credentials: 'include',
          body,
        })
      ).json();

      if (data.success) {
        open('Success', 'Product has been created');
        push(`/products/${data.product?._id}`);
        return;
      }
      open('Failure', data.message ?? 'Could not create new product', 'error');
    } catch (err: any) {
      open('Failure', err.toString(), 'error');
    }
  }

  return (
    <>
      <Head>
        <title>Create new product | Jetzt ist die beste Zeit</title>
      </Head>
      <MDBCard>
        <form onSubmit={handleSubmit}>
          <MDBCardHeader>
            <h1>Create new item form</h1>
          </MDBCardHeader>
          <MDBCardBody>
            <MDBInput
              className="mb-4"
              label="Name"
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
            <MDBTextArea
              className="mb-4"
              label="Description"
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
            <hr className="d-sm-block d-md-none" />
            <MDBRow>
              <MDBCol md={3}>
                <MDBInput
                  className="mb-4"
                  label="Price"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={formData.price}
                />
              </MDBCol>
              <MDBCol md={3}>
                <MDBInput
                  className="mb-4"
                  label="Discount"
                  type="number"
                  name="discount"
                  onChange={handleChange}
                  value={formData.discount}
                />
              </MDBCol>
              <MDBCol md={3}>
                <MDBInput
                  className="mb-4"
                  label="Delivery cost"
                  type="number"
                  name="delivery"
                  onChange={handleChange}
                  value={formData.delivery}
                />
              </MDBCol>
              <MDBCol>
                {formData.discount === '0' || formData.discount === '' ? (
                  <h3 className="m-0 text-end">
                    <MDBTypography>
                      {formatAsPrice(calculateTotalPrice)}
                    </MDBTypography>
                  </h3>
                ) : (
                  <MDBRow>
                    <MDBCol>
                      <MDBTypography className="fw-bold fs-5" tag="s">
                        {formatAsPrice(
                          calculateTotalPrice + Number(formData.discount)
                        )}
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol>
                      <MDBTypography
                        className="fw-bold fs-5"
                        style={{ color: 'red' }}
                      >
                        {formatAsPrice(calculateTotalPrice)}
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>
                )}
              </MDBCol>
            </MDBRow>
            <hr className="d-sm-block d-md-none" />
            <MDBInput
              className="mb-4"
              label="Stock"
              type="number"
              name="stock"
              onChange={handleChange}
              value={formData.stock}
            />
            <label htmlFor="title-image">Title image: </label>
            <MDBInput
              className="mb-4"
              type="file"
              name="titleImage"
              onChange={handleChange}
            />
            <label htmlFor="title-image">Other images: </label>
            <MDBInput
              type="file"
              name="otherImages"
              onChange={handleChange}
              multiple
            />
          </MDBCardBody>
          <MDBCardFooter>
            <MDBRow>
              <MDBBtn
                size="lg"
                disabled={Object.values(formData).some((i) => i.length < 1)}
              >
                Submit
              </MDBBtn>
            </MDBRow>
          </MDBCardFooter>
        </form>
      </MDBCard>
    </>
  );
}
