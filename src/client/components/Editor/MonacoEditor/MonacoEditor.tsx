import React, { FunctionComponent, useRef } from 'react'
import { MonacoEditorPropsModel } from './MonacoEditor.models'
import * as MonacoEditorStyles from './MonacoEditor.styles'
//components
import MonacoEditorOriginal, { } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

const MonacoEditor: FunctionComponent<MonacoEditorPropsModel> = (props): JSX.Element => {
  const {
    className = '',
    changeHandler = () => undefined,
    initialValue = '',
    options = {},
    ...restProps
  } = props;
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const onMountHandler = (editor: monaco.editor.IStandaloneCodeEditor, monaco: any) => {
    editorRef.current = editor;
    // // @ts-ignore
    // const highlighter = new Highlighter(window.monaco,codeShift,editor)
    // highlighter.highLightOnDidChangeModelContent(
    //   () => {},
    //   () => {},
    //   undefined,
    //   () => {}
    // )
  }

  const onChangeHandler = (value: string | undefined, ev: monaco.editor.IModelContentChangedEvent) => {
    changeHandler(value!);
  }

  return (
    <MonacoEditorStyles.MonacoEditorStyled className="monaco-editor-container">
      <MonacoEditorOriginal
        className={`monaco-editor ${className}`}
        value={initialValue}
        theme="vs-dark"
        height="100%"
        defaultLanguage='typescript'
        options={{
          wordWrap: 'on',
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          ...options
        }}
        onMount={onMountHandler}
        onChange={onChangeHandler}
        {...restProps}
      />
    </MonacoEditorStyles.MonacoEditorStyled>
  )
}

export default MonacoEditor