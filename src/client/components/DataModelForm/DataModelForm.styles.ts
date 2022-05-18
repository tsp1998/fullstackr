import styled from 'styled-components'
import Form from '../common/Form/Form'

export const DataModelFormStyled = styled(Form)`
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 0  1rem;
      :first-child {
        width: 100%;
      }
    }
  }
`