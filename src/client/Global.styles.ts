import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: #ffffff !important;
    font-size: 1.6rem;
  }

  a {
    text-decoration: none;
  }

  h3 {
    color: darkblue;
  }
`

export default GlobalStyles