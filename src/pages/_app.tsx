import { type Session } from 'next-auth';
import { type AppType } from 'next/app';
import { Toaster } from '~/components/ui/toaster';
import Head from 'next/head';
import '~/styles/globals.css';
import Sidebar from '~/components/Sidebar';
import { Provider } from 'react-redux';
import { store } from '~/redux/store';
import { UserProvider, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Fox & Friends Admin</title>
      </Head>
      <UserProvider>
        <Provider store={store}>
          <div className="flex w-full">
            <div className="w-[340px]">
              <Sidebar />
            </div>
            <div className="w-full px-12 py-8">
              <Component {...pageProps} />
            </div>
          </div>
          <Toaster />
        </Provider>
      </UserProvider>
    </>
  );
};

export default MyApp;
