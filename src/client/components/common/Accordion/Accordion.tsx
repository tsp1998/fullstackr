import React, { FunctionComponent, useState } from 'react'
import { AccordionPropsModel } from './Accordion.models'
import * as AccordionStyles from './Accordion.styles'

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
          <AccordionStyles.AccordionItemHeading
            className='accordion-item-heading'
            onClick={() => changeExpanedItemIndexHandler(i)}
          >
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