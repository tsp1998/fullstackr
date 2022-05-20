import React, { FunctionComponent } from 'react'
import { TablePropsModel } from './Table.models'
import * as TableStyles from './Table.styles'

const Table: FunctionComponent<TablePropsModel> = (props): JSX.Element => {
  const { className = '', rows = [], headingRows = [], ...restProps } = props;
  return (
    <TableStyles.TableStyled className={`table ${className}`} {...restProps}>
      {headingRows.length && (
        <TableStyles.TableHead className='table-head'>
          {headingRows.map((headingRow, i) => (
            <TableStyles.TableRow key={i} className='table-row'>
              {headingRow.map((cell, j) => (
                <TableStyles.TableHeadCell key={`${i}${j}`} className='table-head-cell'>
                  {cell as JSX.Element}
                </TableStyles.TableHeadCell>
              ))}
            </TableStyles.TableRow>
          ))}
        </TableStyles.TableHead>
      )}
      {rows.length && (
        <TableStyles.TableBody className='table-body'>
          {rows.map((row, i) => (
            <TableStyles.TableRow key={i} className='table-row' style={{background: i %2  === 0? '#eee': '#fff'}}>
              {row.map((cell, j) => (
                <TableStyles.TableCell key={`${i}${j}`} className='table-cell'>
                  {cell as JSX.Element}
                </TableStyles.TableCell>
              ))}
            </TableStyles.TableRow>
          ))}
        </TableStyles.TableBody>
      )}
    </TableStyles.TableStyled>
  )
}

export default Table