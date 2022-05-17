import styled from 'styled-components';
import { ModalPropsModel } from './Modal';

const modalWidthInRem = 40;
export const ModalStyled = styled.div<Partial<ModalPropsModel>>`
	width: ${modalWidthInRem}rem;
	min-height: 17.2rem;
	background: #fff;
	font-size: 1.2rem;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 1px 2px #00000029;
	z-index: 2;
`;

export const HeadingContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: ${modalWidthInRem}rem;
	height: 4rem;
	padding: 0 1rem;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	font-size: 1.4rem;
	font-weight: bolder;
	.heading-icon-container {
		width: 7.5%;
		.heading-icon {
			margin-top: 1rem;
			width: 2.8rem;
			height: 2.8rem;
		}
	}
	.heading-wrapper {
		width: calc(100% - 7.5%);
		margin-left: 0.5rem;
	}
`;

export const InfoContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 1.5rem 4rem;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-self: flex-end;
	margin: auto 2.5rem 1.5rem;
`;
