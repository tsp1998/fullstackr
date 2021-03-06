import styled from 'styled-components'
import Form from '../common/Form/Form'

export const DataModelFormStyled = styled.div`
  form {
    display: flex;
    flex-direction: row;
    
    .form-inputs-container {
      width: 80%;
      order: 2;
      > * {
        width: 20% !important;
        margin: .5rem 1rem;
        input {
          width: 100%;
        }
      }
    }
    
    .form-buttons-container {
      order: 3;
    }

    .monaco-editor-container {
      order: 4;
      height: 30rem;
      width: 100%;
    }
  }
  ul {
    order: 1;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      color: darkblue;
      font-size: 1.8rem;
      margin: 0 1rem;
      width: 20%;
      :first-child {
        width: 100%;
      }
    }
  }
  button {
    order: 4;
  }
`