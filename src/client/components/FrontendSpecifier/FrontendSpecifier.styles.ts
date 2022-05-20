import styled from 'styled-components'
import { FrontendSpecifierPropsModel } from './FrontendSpecifier.models'

export const FrontendSpecifierStyled = styled.div<Partial<FrontendSpecifierPropsModel>>`
  padding: 1rem;

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

  .data-model-form {
    .properties-list {
      li {
        :nth-child(3), :nth-child(4) {
          display: none;
        }
      }
    }
    .form-inputs-container {
      .form-group {
        :nth-child(2), :nth-child(3) {
          display: none;
        }
      }
    }
  }
`