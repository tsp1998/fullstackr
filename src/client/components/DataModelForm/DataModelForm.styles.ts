import styled from 'styled-components'
import Form from '../common/Form/Form'

export const DataModelFormStyled = styled(Form)`
  .form-inputs-container {
    order: 2;
    > * {
      width: 20% !important;
      margin: .5rem 1rem;
      input {
        width: 100%;
      }
    }
  }
  ul {
    order: 1;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 0 1rem;
      width: 20%;
      :first-child {
        width: 100%;
      }
    }
  }
  button {
    order: 3;
  }
`