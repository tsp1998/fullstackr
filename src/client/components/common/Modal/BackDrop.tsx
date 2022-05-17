import React, { ComponentPropsWithRef, CSSProperties, FunctionComponent, MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';
//styles
import { BackDropContainer } from './BackDrop.styles';
//utils
import { addModalContainer } from '../../../utils/react/portal';

export interface BackDropPropsModel extends ComponentPropsWithRef<'div'> {
	onBackDropClick?: MouseEventHandler<HTMLDivElement>;
	onBackDropMouseEnter?: MouseEventHandler<HTMLDivElement>;
	onBackDropMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const BackDrop: FunctionComponent<BackDropPropsModel> = (props): JSX.Element => {
	let backDrop: HTMLDivElement | null = document.getElementById('back-drop') as HTMLDivElement;

	if (!backDrop) {
		backDrop = addModalContainer(true, false).backDrop;
	}

	return createPortal(
		<BackDropContainer
			style={props.style}
			{...(props.onBackDropClick ? { onClick: props.onBackDropClick } : {})}
			{...(props.onBackDropMouseEnter ? { onMouseEnter: props.onBackDropMouseEnter } : {})}
			{...(props.onBackDropMouseLeave ? { onMouseLeave: props.onBackDropMouseLeave } : {})}
		/>,
		backDrop!
	);
};

export default BackDrop;
