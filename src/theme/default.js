import { createTheme } from '@mui/material/styles'

const colors = {
  primary: {
    main: 'rgba(0, 76, 211, 1)',
    light: '#dfd8e2',
  },
  secondary: {
    main: '#a7a7a7',
    light: '#ededed',
    dark: '#666464',
  },
  warning: {
    main: '#ed6c02',
  },
  success: {
    main: 'rgba(23, 178, 106, 1)',
  },
  background: {
    default: '#fff',
  },
  info: {
    main: '#fff',
  },
}

const defaultTheme = createTheme({
  palette: {
    ...colors,
  },

  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'p' },
          style: {
            fontFamily: 'Roboto',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.25px',
            color: 'rgba(102, 112, 133, 1)',
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '28px',
            lineHeight: '36px',
            color: 'rgba(0, 0, 0, 1)',
          },
        },
        {
          props: { variant: 'h4' },
          style: {
            fontSize: '32px',
          },
        },
        {
          props: { variant: 'h5' },
          style: {
            fontSize: '24px',
          },
        },
        {
          props: { variant: 'h6' },
          style: {
            color: colors.secondary.dark,
          },
        },
        {
          props: { variant: 'body' },
          style: {
            color: colors.secondary.main,
            fontSize:'18px',
            fontWeight:600
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            fontSize: '14px',
          },
        },
        {
          props: { variant: 'body2' },
          style: {
            color: colors.secondary.dark,
            fontWeight:600
          },
        },
      ],
    },
    MuiChip: {
      variants: [
        {
          props: { variant: 'filled', color: 'success' },
          style: {
            backgroundColor: colors.primary.main,
            color: colors.primary.main,
            fontWeight: '600',
            borderRadius: '5px',
            width: '70px',
            height: '25px',
            '&:hover': {
              backgroundColor: colors.primary.main,
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'filled', color: 'primary' },
          style: {
            backgroundColor: colors.secondary.main,
            color: colors.secondary.light,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: colors.secondary.light,
              color: colors.secondary.main,
              border: ` 1px solid ${colors.secondary.main}`,
            },
          },
        },
        {
          props: { variant: 'filled', color: 'error' },
          style: {
            backgroundColor: colors.primary.main,
            color: colors.primary.main,
            borderRadius: '8px',
            padding: '10px',
            border: `1px solid ${colors.primary.main}`,
            fontSize: '16px',
            fontWeight: '500',
            '&:hover': {
              backgroundColor: colors.primary.main,
              color: colors.primary.main,
            },
          },
        },
        {
          props: { variant: 'filled', color: 'warning' },
          style: {
            backgroundColor: colors.primary.main,
            color: colors.primary.main,
            fontWeight: '600',
            borderRadius: '5px',
            width: '150px',
            height: '25px',
            '&:hover': {
              backgroundColor: colors.primary.main,
              color: 'white',
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: colors.primary.main,
            borderRadius: '100px',
            gap: '10px',
            color: colors.background.default,
          },
        },
      ],
    },
  },
})

export default defaultTheme
