import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { AuthGate, HtmlHead, Layout, AuthProvider } from '@/components';
import { theme, createEmotionCache } from '@/constants';
import { initializeStore } from '@/redux/store';

import type { MyAppProps } from '@/types';

function MyApp({ Component, pageProps, emotionCache }: MyAppProps) {
  const styleCache = useMemo(() => emotionCache || createEmotionCache(), [emotionCache]);
  const store = useMemo(() => {
    return initializeStore(pageProps.internal?.initialReduxState);
  }, [pageProps.internal?.initialReduxState]);

  return (
    <Provider store={store}>
      <CacheProvider value={styleCache}>
        <ThemeProvider theme={theme}>
          <HtmlHead {...pageProps.internal?.metaData} />
          <CssBaseline />
          <AuthProvider>
            <AuthGate auth={pageProps.internal?.auth}>
              <Layout layoutType={pageProps.internal?.layout}>
                <Component {...pageProps} />
              </Layout>
            </AuthGate>
            <ToastContainer />
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
export default MyApp;
