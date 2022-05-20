import React, { FunctionComponent, useEffect, useRef } from 'react'
import { MonacoEditorPropsModel } from './MonacoEditor.models'
import * as MonacoEditorStyles from './MonacoEditor.styles'
//components
import MonacoEditorOriginal, { } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import { Button } from '../../common'

const MonacoEditor: FunctionComponent<MonacoEditorPropsModel> = (props): JSX.Element => {
  const {
    className = '',
    changeHandler = () => undefined,
    initialValue = '',
    options = {},
    format = false,
    syntaxValidation = true,
    language = "typescript",
    ...restProps
  } = props;
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const onMountHandler = (editor: monaco.editor.IStandaloneCodeEditor, monaco: any) => {
    editorRef.current = editor;
    if (!syntaxValidation) {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
    }
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

  const formatCode = () => {
    try {
      let plugins: Array<string | prettier.Plugin<any>> = []
      if (language === 'json') {
        plugins.push(parser) // TODO: check for json parser
      } else {
        plugins.push(parser)
      }
      const formattedValue = prettier.format(initialValue, {
        parser: 'json',
        plugins
      })
      if (editorRef.current) {
        editorRef.current.setValue(formattedValue)
      }
    } catch (error) {
      console.log(`error`, error)
    }
  }

  useEffect(() => {
    if (format) {
      formatCode()
    }
  }, [initialValue])

  return (
    <MonacoEditorStyles.MonacoEditorStyled className="monaco-editor-container">
      <Button>Format</Button>
      <MonacoEditorOriginal
        className={`monaco-editor ${className}`}
        value={initialValue}
        // theme="vs-dark"
        language={language}
        height="100%"
        options={{
          wordWrap: 'on',
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          minimap: { enabled: false },
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