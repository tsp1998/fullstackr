import styled from 'styled-components'
import { TextareaPropsModel } from './Textarea.models'

export const TextareaStyled = styled.textarea<Partial<TextareaPropsModel>>`
  padding: .5rem 1rem;
  border-radius: .5rem;
  border: 1px solid #ccc;
`