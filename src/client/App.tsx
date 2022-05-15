import React, { FunctionComponent, useEffect } from 'react'
//router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//styles
import { ThemeProvider } from 'styled-components'
import * as lightTheme from './themes/light'
import * as AppStyles from './App.styles'
//components
import Header from './components/Header/Header'
import a from '../common'
//pages
const IndexPage = React.lazy(() => import('./pages/IndexPage/IndexPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'))

console.log(a)

const App: FunctionComponent<{}> = (props): JSX.Element => {
  useEffect(() => {
    fetch('/data/users.json')
      .then(res => res.json())
      .then(res => console.log(`res`, res))
  }, [])
  return (
    <Router>
      <ThemeProvider theme={lightTheme}>
        <AppStyles.AppStyled>
          <Header />
          <React.Suspense fallback={<div>Loading page...</div>}>
            <Routes>
              <Route path='/' element={<IndexPage />} />
              <Route path='/about' element={<AboutPage />} />
            </Routes>
          </React.Suspense>
        </AppStyles.AppStyled>
      </ThemeProvider>
    </Router>
  )
}

export default App