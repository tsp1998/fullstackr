import styled from 'styled-components'
import { TablePropsModel } from './Table.models'

export const TableStyled = styled.table<Partial<TablePropsModel>>`
  border: 1px solid #eee;
`

export const TableBody = styled.tbody`

`

export const TableHead = styled.thead`
  background: #ddd;
`

export const TableRow = styled.tr`
  border: 1px solid #eee;
`

export const TableHeadCell = styled.th`
  padding: 0.5rem 1rem;
`

export const TableCell = styled.td`
  padding: 0.5rem 1rem;
`