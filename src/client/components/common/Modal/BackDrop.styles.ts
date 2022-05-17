import styled from 'styled-components';
import { BackDropPropsModel } from './BackDrop';

export const BackDropContainer = styled.div<Partial<BackDropPropsModel>>`
	width: 100vw;
	height: 100vh;
	background: #000111aa;
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
`;
