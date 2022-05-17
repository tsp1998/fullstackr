import React, { ComponentPropsWithRef } from 'react';
// styles
import * as ModalStyles from './Modal.styles';
// components
import Button from '../Button/Button';
//models
import { ButtonModel } from '../Button/Button.models';
//assets
import errorIcon from '../../../assets/images/icons/common/error.svg';

type VariantType = 'info' | 'warning' | 'error' | 'success';
export interface ModalPropsModel extends ComponentPropsWithRef<'div'> {
	className?: string;
	variant?: VariantType;
	size?: 'small' | 'medium' | 'large' | 'extra-small' | 'extra-large';
	closeModalHandler: Function;
	heading?: string | JSX.Element;
	buttons?: Array<ButtonModel & { modalCloseButton?: boolean }>;
}

const Modal: React.FunctionComponent<ModalPropsModel> = (props) => {
	const { className = '', variant = 'info', size = 'small', ...restProps } = props;
	return (
		<ModalStyles.ModalStyled className={`info-modal ${className}`} {...restProps}>
			<ModalStyles.HeadingContainer className="heading-container">
				<div className="heading-wrapper">
					{props.heading}
				</div>
			</ModalStyles.HeadingContainer>
			<ModalStyles.InfoContainer className="info-container">
				{props.children}
			</ModalStyles.InfoContainer>
			{props.buttons?.length && (
				<ModalStyles.ButtonsContainer className="buttons-container">
					{props.buttons.map(({ onClick = () => undefined, ...restButtonProps }, i) => (
						<Button
							key={`modal-button-${i}`}
							{...(restButtonProps.modalCloseButton
								? {
									onClick: (event) => {
										onClick(event);
										props.closeModalHandler();
									},
								}
								: { onClick })}
							{...restButtonProps}
						/>
					))}
				</ModalStyles.ButtonsContainer>
			)}
		</ModalStyles.ModalStyled>
	);
};

export default Modal;
