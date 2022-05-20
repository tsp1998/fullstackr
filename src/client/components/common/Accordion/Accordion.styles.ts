import styled from 'styled-components'
import { AccordionPropsModel } from './Accordion.models'

export const AccordionStyled = styled.ul<Partial<AccordionPropsModel>>`
  list-style: none;
`

export const AccordionItem = styled.li`

`

export const AccordionItemHeading = styled.div`
  display: flex;
  padding: 1rem .5rem;
  background: #d9ffdd;
  color: darkblue;
  display: flex;
  align-items: center;
  margin: 1.5px 0;
  .icon {
    cursor: pointer;
    width: 1rem;
    height: 1rem;
    margin: 0 1rem;
    &.rotate {
      transform: rotate(-90deg);
    }
  }
`

export const AccordionItemBody = styled.div`

`