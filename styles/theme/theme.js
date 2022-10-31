import { createTheme } from "@mui/material/styles";
import { experimental_sx as sx } from '@mui/material/styles';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const theme = createTheme({
    // shape: {
    //   borderRadius: 25
    // },
    palette: {
        mode: 'dark',
        text: {
          primary: "#EFF2FD"
        },
        background: {
            default: "#090F27",
            paper: "#090F27",
        },
        divider: '#131B3F',
        // color: "#EFF2FD",
        primary: {
          // light: will be calculated from palette.primary.main,
          // main: '#090F27',
          light: '#2F88FF',
          main: '#3361FF',
          contrastText: '#EFF2FD',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          // light: '#2F88FF',
          // main: '#3361FF',
          main: '#EFF2FD',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#090F27',
        },
        neutral: {
          // light: '#EFF2FD',
          main: '#EFF2FD',
          dark: '#131B3F',
          contrastText: '#090F27',
        }
         // Provide every color token (light, main, dark, and contrastText) when using
         // custom colors for props in Material UI's components.
         // Then you will be able to use it like this: `<Button color="custom">`
         // (For TypeScript, you need to add module augmentation for the `custom` value)
        // custom: {
        //   light: '#ffa726',
        //   main: '#f57c00',
        //   dark: '#ef6c00',
        //   contrastText: 'rgba(0, 0, 0, 0.87)',
        // },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        // contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        // tonalOffset: 0.2,
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
            padding: '1.25vh 1.5vw',
          },
        } 
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
      }
    }
})

export default theme
