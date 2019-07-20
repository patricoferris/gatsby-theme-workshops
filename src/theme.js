export const theme = {
  space: [4, 8, 16, 32],
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Sans Serif',
  },
  fontSizes: [16, 18, 22, 28, 32],
  lineHeights: {
    body: 1.45,
    heading: 1.15
  },
  colors: {
    gray: ['#efefef', '#ddd', '#333', '#111'],
    orange: '#fbc54d',
    green: '#8bc27e',
    red: ['#f90c1d'],
    background: '#fff',
    primary: 'rebeccapurple'
  },
  sizes: {
    default: '90vw',
    max: '920px'
  },
  styles: {
    Layout: {
      color: 'gray.2',
      fontFamily: 'body',
      fontSize: 0,
      lineHeight: 'body'
    },
    Header: {
      backgroundColor: 'background',
      color: 'gray.3',
      fontWeight: 'bold',
      margin: '0 auto',
      padding: 2,
      width: '100%',
      height: 'auto',
      boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
      textAlign: 'center',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '1fr',
      alignItems: 'center',
      justifyItems: 'center',
      marginBottom: '8px'
    },
    Main: {
      margin: '0 auto',
      maxWidth: 'max',
      width: 'default'
    },
    Container: {
      padding: 3,
      marginBottom: '100px'
    }, 
    h1: {
      color: 'gray.3',
      fontSize: 5,
      fontWeight: 'bold',
      lineHeight: 'heading',
      margin: 0,
      marginTop: 3
    },
    h3: {
      fontSize: 4,
      fontWeight: 'bold',
      lineHeight: 'heading',
      borderBottom: 'thin solid grey'
    },
  }
}