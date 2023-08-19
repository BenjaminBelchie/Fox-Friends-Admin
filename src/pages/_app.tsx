import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { Toaster } from '~/components/ui/toaster';
import Head from 'next/head';
import '~/styles/globals.css';
import Sidebar from '~/components/Sidebar';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '~/redux/store';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Fox & Friends Admin</title>
      </Head>
      <Provider store={store}>
        <div className="flex w-screen">
          <Sidebar />
          <div className="w-full px-12 py-8">
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </div>
        </div>
        <Toaster />
      </Provider>
    </>
  );
};

export default MyApp;
