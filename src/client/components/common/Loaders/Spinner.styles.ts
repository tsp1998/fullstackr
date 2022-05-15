import styled, { keyframes, css } from 'styled-components';
import { SpinnerPropsModel } from './Spinner';

const rotationAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div<SpinnerPropsModel>`
	border: 1px solid ${({ color }) => color || '#000'};
	border-radius: 50%;
	border-top: none;
	border-right: none;
	width: 3rem;
	height: 3rem;
	animation: ${rotationAnimation} 1s linear infinite;
`;
