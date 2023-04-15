import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Jetzt ist die beste Zeit Online Shop</title>
        <meta name="description" content="Online shop for rare toys" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MDBCarousel showControls showIndicators>
        <MDBCarouselItem
          active="true"
          itemId={1}
          className="w-100 d-block"
          src="https://mdbootstrap.com/img/new/slides/041.jpg"
        >
          <h5>First slide</h5>
          <p>Welcome to our shop</p>
        </MDBCarouselItem>
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={2}
          src="https://mdbootstrap.com/img/new/slides/042.jpg"
        >
          <h5>Second slide</h5>
          <p>Welcome again</p>
        </MDBCarouselItem>
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={3}
          src="https://mdbootstrap.com/img/new/slides/043.jpg"
        >
          <h5>Third slide</h5>
          <p>Welcome again again</p>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
}
