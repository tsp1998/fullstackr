import styled from 'styled-components'
import { ButtonPropsModel } from './Button.models'

export const ButtonStyled = styled.button<Partial<ButtonPropsModel>>`
  padding: .5rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;

  :active {
    transform: translate(1px, 1px) scale(.9);
  }
`