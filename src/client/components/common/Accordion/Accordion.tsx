import React, { FunctionComponent, useState } from 'react'
import { AccordionPropsModel } from './Accordion.models'
import * as AccordionStyles from './Accordion.styles'
//components
import Icon from '../Icon/Icon'
//assets
import arrowIcon from '../../../assets/icons/arrow.svg'

const Accordion: FunctionComponent<AccordionPropsModel> = (props): JSX.Element => {
  const { className = '', items = [], ...restProps } = props;
  const [expanedItemIndex, setExpanedItemIndex] = useState(0);

  const changeExpanedItemIndexHandler = (index: number) => {
    setExpanedItemIndex(index === expanedItemIndex ? -1 : index);
  }

  return (
    <AccordionStyles.AccordionStyled className={`accordion ${className}`} {...restProps}>
      {items.map((item, i) => (
        <AccordionStyles.AccordionItem key={i} className="accordion-item">
          <AccordionStyles.AccordionItemHeading className='accordion-item-heading'>
            <Icon
              className={i === expanedItemIndex ? '' : 'rotate'}
              onClick={() => changeExpanedItemIndexHandler(i)}
              src={arrowIcon}
            />
            {item.heading}
          </AccordionStyles.AccordionItemHeading>
          {i === expanedItemIndex && (
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