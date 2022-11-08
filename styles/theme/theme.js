import { createTheme } from "@mui/material/styles";
import { experimental_sx as sx } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Gilroy',
  },
  palette: {
    mode: 'dark',
    text: {
      primary: "#EFF2FD",
      secondary: '#A5B0D6'
    },
    background: {
      default: "#090F27",
      paper: "#131B3F",
    },
    divider: '#131B3F',
    primary: {
      light: '#2F88FF',
      main: '#3361FF',
      contrastText: '#EFF2FD',
    },
    secondary: {
      main: '#EFF2FD',
      contrastText: '#090F27',
    },
    neutral: {
      main: '#EFF2FD',
      dark: '#131B3F',
      contrastText: '#090F27',
    }
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          backgroundColor: '#131B3F',
          "&:before": {
            content: 'none'
          },
          "&:after": {
            content: 'none'
          },
        },
        input: {
          padding: '1.25vh 1.5vw'
        },
        adornedEnd: {
          paddingRight: '1.5vw'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          backgroundColor: '#131B3F',
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textAlign: 'right'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          // padding: '1.25vh 1.5vw',
        },
      },
      variants: [
        {
          props: { variant: 'dark' },
          style: {
            backgroundColor: '#090F27',
            color: '#919CC0'
          }
        },
      ],
    },
    MuiInputBase: {
      defaultProps: {
        root: {
          borderRadius: 25
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 25
        },
        icon: sx({
          color: '#3361FF',
          marginRight: '1vw'
        })
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '2.5vh 2vw'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Gilroy';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(/public/assets/Gilroy-Regular.ttf) format('ttf');
          }`,
    },
  }
})

export default theme