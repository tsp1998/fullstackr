import styled from 'styled-components'
import { BackendSpecifierPropsModel } from './BackendSpecifier.models'

export const BackendSpecifierStyled = styled.div<Partial<BackendSpecifierPropsModel>>`
  padding: 1rem;

  button {
    margin-top: .5rem;
    padding: .5rem 2rem;
  }

  .save-button {
    padding: 1rem 4rem;
  }

  form {
    .form-inputs-container {
      display: flex;
      flex-wrap: wrap;
      .form-group {
        :nth-child(1) {
          width: 100%;
          order: 1;
        }
        :nth-child(2), :nth-child(3), :nth-child(4), :nth-child(5) {
          order: 3;
        }
        :nth-child(6), :nth-child(7), :nth-child(8), :nth-child(9) {
          order: 5;
        } 
      }

      .item-request-types-label {
        width: 100%;
        order: 2;
      }

      .list-request-types-label {
        width: 100%;
        order: 4;
      }
    }
  }
`