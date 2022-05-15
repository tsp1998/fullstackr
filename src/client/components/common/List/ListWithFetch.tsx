import React, { FunctionComponent, useEffect } from 'react'
//models
import { ListPropsModel } from './List.models'
//components
import List from './List'
//hooks
import useRequest from '../../../hooks/useRequest'

interface ListWithFetchPropsModel extends Omit<ListPropsModel, 'items'> {
  api: string;
}

const ListWithFetch: FunctionComponent<ListWithFetchPropsModel> = (props): JSX.Element => {
  const { data, loading, request, errorMessage } = useRequest();

  useEffect(() => {
    request({
      requestType: 'get',
      apiFunctionParams: [props.api]
    });
  }, [])

  return (
    <List items={data || []} loading={loading} {...props} />
  )
}

export default ListWithFetch