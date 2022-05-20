import React, { FunctionComponent } from 'react'
//router
import { Link } from 'react-router-dom'
//styles
import * as HeaderStyles from './Header.styles'

const Header: FunctionComponent<{}> = (props): JSX.Element => {
  const projectId = window.location.pathname.slice(1)
  return (
    <HeaderStyles.HeaderStyled>
      <HeaderStyles.Brand>
        <Link to="/">FULLSTACKR</Link>
      </HeaderStyles.Brand>
      <div className="project-info">
        <div className="project-name">{projectId.slice(0, projectId.indexOf('-')).toUpperCase()}</div>
        <div className="project-id">({projectId})</div>
      </div>
      <div className="links">
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
      </div>
    </HeaderStyles.HeaderStyled>
  )
}

export default Header