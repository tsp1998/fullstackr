import styled, { DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ModalContainerPropsModel } from './ModalContainer';

export const ModalContainerStyled = styled.div<Partial<ModalContainerPropsModel>>`
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	${({ styledStyle }) => (styledStyle ? styledStyle : '')}
`;
