import React, { FunctionComponent } from 'react'
//models
import { ListPropsModel } from './List.models'
//styles
import * as ListStyles from './List.styles'
//components
import Spinner from '../Loaders/Spinner'
import Item from '../Item/Item'

const List: FunctionComponent<ListPropsModel> = (props): JSX.Element => {
  const {
    className = '',
    loading = false,
    HeaderJSX,
    Header,
    heading,
    ...restProps
  } = props;

  return (
    <ListStyles.ListStyled className={`list ${className}`} {...restProps}>
      <ListStyles.HeadingContainer className='list-heading-container'>
        {HeaderJSX || Header && <Header /> || (
          <ListStyles.HeadingWrapper>{heading}</ListStyles.HeadingWrapper>
        )}
      </ListStyles.HeadingContainer>
      {loading && <Spinner />}
      {!props.items.length ? <li>No Items</li> : props.items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </ListStyles.ListStyled>
  )
}

export default List