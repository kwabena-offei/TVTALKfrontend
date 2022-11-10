import Footer from "../components/Footer"
import Header from "../components/Header"
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import '../styles/custom.css'
import createEmotionCache from '../util/createEmotionCache';
import theme from '../styles/theme/theme';
import { createGlobalStyle } from "styled-components";
import AppBar from '../components/AppBar';

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/Gilroy-Regular.woff') format('woff');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
`;

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      <CacheProvider value={emotionCache}>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box >
            {/* <Header /> */}
            <AppBar />
            {getLayout(<Component {...pageProps} />)}
            <Footer />
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </>

  )
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
