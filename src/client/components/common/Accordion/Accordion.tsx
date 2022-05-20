import React, { FunctionComponent, useEffect, useState } from 'react'
import { AccordionPropsModel } from './Accordion.models'
import * as AccordionStyles from './Accordion.styles'
//components
import Icon from '../Icon/Icon'
//assets
import arrowIcon from '../../../assets/icons/arrow.svg'

const Accordion: FunctionComponent<AccordionPropsModel> = (props): JSX.Element => {
  const { className = '', items = [], expanedItemIndex: expanedItemIndexFromProps, noOtherCollapse = false, ...restProps } = props;
  const [expanedItemIndex, setExpanedItemIndex] = useState(expanedItemIndexFromProps);
  const [expanedItemIndexes, setExpanedItemIndexes] = useState<Array<number>>([]);

  useEffect(() => {
    setExpanedItemIndex(expanedItemIndexFromProps)
  }, [expanedItemIndexFromProps])

  // const changeExpanedItemIndexHandler = (index: number) => {
  //   setExpanedItemIndex(index === expanedItemIndex ? -1 : index);
  // }
  const changeExpanedItemIndexHandler = (index: number) => {
    const i = expanedItemIndexes.indexOf(index);
    if (i === -1) {
      setExpanedItemIndexes([...expanedItemIndexes, index])
    } else {
      if (expanedItemIndexes.length === 1 && expanedItemIndexes[0] === index) {
        return setExpanedItemIndexes([])
      }
      if (!noOtherCollapse) {
        const newExpanedItemIndexes = expanedItemIndexes
        newExpanedItemIndexes.splice(index, 1);
        setExpanedItemIndexes([...newExpanedItemIndexes])
      } else {
        setExpanedItemIndexes([index])
      }
    }
  }

  return (
    <AccordionStyles.AccordionStyled className={`accordion ${className}`} {...restProps}>
      {items.map((item, i) => (
        <AccordionStyles.AccordionItem key={i} className={`accordion-item ${item.className || ''}`}>
          <AccordionStyles.AccordionItemHeading className='accordion-item-heading'>
            <Icon
              className={expanedItemIndexes.indexOf(i) > -1 ? '' : 'rotate'}
              onClick={() => changeExpanedItemIndexHandler(i)}
              src={arrowIcon}
            />
            {item.heading}
          </AccordionStyles.AccordionItemHeading>
          {expanedItemIndexes.indexOf(i) > -1 && (
            <AccordionStyles.AccordionItemBody className='accordion-item-body'>
              {item.body}
            </AccordionStyles.AccordionItemBody>
          )}
        </AccordionStyles.AccordionItem>
      ))}
    </AccordionStyles.AccordionStyled>
  )
}

export default Accordion