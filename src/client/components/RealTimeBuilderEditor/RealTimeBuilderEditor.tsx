import React, { FunctionComponent } from 'react'
import { RealTimeBuilderEditorPropsModel } from './RealTimeBuilderEditor.models'
import * as RealTimeBuilderEditorStyles from './RealTimeBuilderEditor.styles'
//components
import MonacoEditor from '../Editor/MonacoEditor/MonacoEditor'

const RealTimeBuilderEditor: FunctionComponent<RealTimeBuilderEditorPropsModel> = (props): JSX.Element => {
  const { className = '', changeHandler, ...restProps } = props;
  return (
    <RealTimeBuilderEditorStyles.RealTimeBuilderEditorStyled 
    className={`real-time-builder-editor ${className}`}
      {...restProps}
    >
      <MonacoEditor 
        initialValue={"import React from 'react';\nimport ReactDOM from 'react-dom'\nconst App = () => {\nreturn <h1>Hello</h1>;\n}\nReactDOM.render(\n<App />,\ndocument.querySelector('#root')\n)"} 
      changeHandler={changeHandler} 
      />
    </RealTimeBuilderEditorStyles.RealTimeBuilderEditorStyled>
  )
}

export default RealTimeBuilderEditor