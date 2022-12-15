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
      // main: '#EFF2FD',
      main: '#A5B0D6',
      dark: '#131B3F',
      contrastText: '#090F27',
    }
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          backgroundColor: '#131B3F',
          "&:before": {
            content: 'none'
          },
          "&:after": {
            content: 'none'
          },
          ":focus": {
            borderRadius: 30,
          }
        },
        input: {
          padding: '12px 30px'
        },
        adornedEnd: {
          paddingRight: '30px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 30
        },
        input: {
          padding: '12px 30px'
        },
        adornedEnd: {
          paddingRight: '30px'
        },
        notchedOutline: {
          border: '1px solid #090F27',
          ":focus": {
            border: '1px solid #090F27'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          backgroundColor: '#090F27'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // textAlign: 'right'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
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
      styleOverrides: {
        root: {
          borderRadius: 30,
          ":focus": {
            borderRadius: 30,
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          backgroundColor: '#090F27',
          ":focus": {
            borderRadius: 30,
          },
        },
        icon: sx({
          color: '#3361FF',
          marginRight: '20px'
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
    }
  }
})

export default theme