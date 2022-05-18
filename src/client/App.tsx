import React, { FunctionComponent, useEffect } from 'react'
//router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//styles
import { ThemeProvider } from 'styled-components'
import * as lightTheme from './themes/light'
import * as AppStyles from './App.styles'
//components
import Header from './components/Header/Header'
//pages
const IndexPage = React.lazy(() => import('./pages/IndexPage/IndexPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'))
const BuilderPage = React.lazy(() => import('./pages/BuilderPage/BuilderPage'))

const App: FunctionComponent<{}> = (props): JSX.Element => {
  return (
    <Router>
      <ThemeProvider theme={lightTheme}>
        <AppStyles.AppStyled>
          <Header />
          <React.Suspense fallback={<div>Loading page...</div>}>
            <Routes>
              <Route path='/' element={<IndexPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/:projectId' element={<BuilderPage />} />
            </Routes>
          </React.Suspense>
        </AppStyles.AppStyled>
      </ThemeProvider>
    </Router>
  )
}

export default App