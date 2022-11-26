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

function App(props) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps, ctx } = props;
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <CacheProvider value={emotionCache}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
          sx={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column'
          }}
          >
            {/* <Header /> */}
            <AppBar context={ctx} />
            {getLayout(<Component {...pageProps} />)}
            <Footer />
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </>

  )
}

export default App