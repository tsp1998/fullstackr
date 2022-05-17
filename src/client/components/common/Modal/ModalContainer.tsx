import React, { ComponentPropsWithRef, CSSProperties, FunctionComponent, MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';

//styles
import * as ModalStyles from './ModalContainer.styles';
//models & components
import BackDrop, { BackDropPropsModel } from './BackDrop';
import { DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';
//utils
import { addModalContainer } from '../../../utils/react/portal';

export interface ModalContainerPropsModel extends ComponentPropsWithRef<'div'>, BackDropPropsModel {
	backDropStyle?: CSSProperties;
	styledStyle?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const ModalContainer: FunctionComponent<ModalContainerPropsModel> = (props): JSX.Element => {
	const {
		className = '',
		styledStyle,
		children,
		backDropStyle,
		...restProps
	} = props;

	let modalContainer: HTMLDivElement | null = document.getElementById('modal-container') as HTMLDivElement;

	if (!modalContainer) {
		modalContainer = addModalContainer(false, true).modalContainer;
	}

	return createPortal(
		<>
			<BackDrop style={backDropStyle} {...restProps} />
			<ModalStyles.ModalContainerStyled
				className={`modal-container ${className}`}
				styledStyle={styledStyle}
				{...restProps}
			>
				{children}
			</ModalStyles.ModalContainerStyled>
		</>,
		modalContainer!
	);
};

export default ModalContainer;
