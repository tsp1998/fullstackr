import React, { FunctionComponent } from 'react'
//router
import { Link } from 'react-router-dom'
//styles
import * as HeaderStyles from './Header.styles'

const Header: FunctionComponent<{}> = (props): JSX.Element => {
  return (
    <HeaderStyles.HeaderStyled>
      <HeaderStyles.Brand>FULLSTACKR</HeaderStyles.Brand>
      <div className="links">
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
      </div>
    </HeaderStyles.HeaderStyled>
  )
}

export default Header