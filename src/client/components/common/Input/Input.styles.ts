import styled from 'styled-components'
import { InputPropsModel } from './Input.models'

export const InputStyled = styled.input<Partial<InputPropsModel>>`
  padding: .5rem 1rem;
  border-radius: .5rem;
  border: 1px solid #ccc;
`