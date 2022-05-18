import React from 'react'
import { Navigate } from 'react-router-dom'

const Redirect: React.FunctionComponent<{ redirectPath: string }> = (props): JSX.Element => {
  return props.redirectPath ? <Navigate to={props.redirectPath} /> : <></>
}

export default Redirect