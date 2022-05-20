import styled from 'styled-components'
import {ListPropsModel} from './List.models'

export const ListStyled = styled.ul<Partial<ListPropsModel>>`
  list-style: none;
  border: 1px solid #eee;

  .item {
    margin: .5rem 0;
    background: #eee;
  }
`

export const HeadingContainer = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
`

export const HeadingWrapper = styled.span`

`