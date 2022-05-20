import styled from 'styled-components'
import { CardPropsModel } from './Card.models'

export const CardStyled = styled.div<Partial<CardPropsModel>>`
  width: 18rem;
  height: 20rem;
  box-shadow: 1px 1px 1px rgba(0,0,0, .2);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CardHeader = styled.div`
  height: 10%;
  margin: 1rem 0;
`

export const CardContent = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
`

export const CardFooter = styled.div`
  height: 10%;
  margin: 1rem 0;
`