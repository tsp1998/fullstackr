import React, { FunctionComponent, useEffect } from 'react'
//models
import { ListPropsModel } from './List.models'
//styles
import * as ListWithFetchStyles from './List.styles'
//components
import Spinner from '../Loaders/Spinner'
import Item from '../Item/Item'
//hooks
import useRequest from '../../../hooks/useRequest'

const ListWithFetch: FunctionComponent<Omit<ListPropsModel, 'items'>> = (props): JSX.Element => {
  const {
    className = '',
    loading = false,
    HeaderJSX,
    Header,
    heading,
    ...restProps
  } = props;

  const { data, request, errorMessage } = useRequest();

  useEffect(() => {
    const api = 'http://localhost:8080/api/users'
    request('get', 'list', api);
  }, [])

  console.log(`data`, data)
  console.log(`errorMessage`, errorMessage)

  interface UserModel {
    id: string;
    name: string;
  }

  return (
    <ListWithFetchStyles.ListStyled className={`ListWithFetch ${className}`} {...restProps}>
      <ListWithFetchStyles.HeadingContainer className='ListWithFetch-heading-container'>
        {HeaderJSX || Header && <Header /> || (
          <ListWithFetchStyles.HeadingWrapper>{heading}</ListWithFetchStyles.HeadingWrapper>
        )}
      </ListWithFetchStyles.HeadingContainer>
      {loading && <Spinner />}
      {(data as Array<UserModel>)?.length && (data as Array<UserModel>).map(
        user => <div key={user.id}>{user.name}</div>
      )}
    </ListWithFetchStyles.ListStyled>
  )
}

export default ListWithFetch