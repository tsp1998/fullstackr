import React, { FunctionComponent } from 'react';
import { SpinnerContainer } from './Spinner.styles';

export interface SpinnerPropsModel {
	sizeInPercent?: number;
	sizeInRem?: number;
	sizeInPixel?: number;
	color?: string;
}

const Spinner: FunctionComponent<SpinnerPropsModel> = (props): JSX.Element => {
	return <SpinnerContainer className='spinner' {...props} />
};

export default Spinner;
