import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events"></meta>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          ></meta>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
