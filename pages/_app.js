import Footer from "../components/Footer"
import Header from "../components/Header"
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import '../styles/main.scss'
import createEmotionCache from '../util/createEmotionCache';
import theme from '../styles/theme/theme';

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  console.log('props', props)

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box >
            {/* <Header /> */}
            <Component {...pageProps} />
            <Footer />
          </Box>
        </ThemeProvider>
      </CacheProvider>
{/* sx={{maxWidth: '1520px', margin: 'auto'}} */}
    </>

  )
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
