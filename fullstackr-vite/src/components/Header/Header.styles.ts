import styled from 'styled-components'

export const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.colors.headerBackgroundColor};
  height: ${({ theme }) => theme.sizes.headerHeightInRem}rem;
  color: #fff;

  a {
    color: #fff;
    margin: 0 1rem;
  }
`

export const Brand = styled.h1`

`