import React, { FunctionComponent, useEffect, useState } from 'react'
import { RealTimeBuilderPropsModel } from './RealTimeBuilder.models'
import * as RealTimeBuilderStyles from './RealTimeBuilder.styles'
//components
import RealTimeBuilderEditor from '../RealTimeBuilderEditor/RealTimeBuilderEditor'
import RealTimeBuilderPreview from '../RealTimeBuilderPreview/RealTimeBuilderPreview'
//utils
import bundle from '../../bundler'

const RealTimeBuilder: FunctionComponent<RealTimeBuilderPropsModel> = (props): JSX.Element => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErrorMessage(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);


  return (
    <RealTimeBuilderStyles.RealTimeBuilderStyled>
      <RealTimeBuilderEditor changeHandler={setInput} />
      <RealTimeBuilderPreview code={code} errorMessage={errorMessage} />
    </RealTimeBuilderStyles.RealTimeBuilderStyled>
  )
}

export default RealTimeBuilder