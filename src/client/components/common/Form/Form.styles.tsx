import styled from 'styled-components'
import { FormPropsModel } from './Form.models'

export const FormStyled = styled.form<Partial<FormPropsModel>>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  > * {
    margin: .2rem 0;
  }
`

export const FormInputsContainer = styled.div`

`

export const FormButtonsContainer = styled.div`
  
`

export const FormMessage = styled.div<{ messageType: 'success' | 'error' }>`
  color: ${({ messageType }) => messageType === 'success' ? 'green' : 'red'};
`