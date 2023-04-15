import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/styles/input.css';
import '@/styles/notification.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/components';
import { CartProvider, UserProvider } from '@/context';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { NotificationProvider } from '@/context/notification';

export default function App({ Component, pageProps }: AppProps) {
  const paypalOptions = {
    'client-id': process.env.PAYPAL_CLIENT_ID as string,
    currency: 'EUR',
    intent: 'capture',
  };

  return (
    <UserProvider>
      <CartProvider>
        <PayPalScriptProvider options={paypalOptions}>
          <NotificationProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationProvider>
        </PayPalScriptProvider>
      </CartProvider>
    </UserProvider>
  );
}
