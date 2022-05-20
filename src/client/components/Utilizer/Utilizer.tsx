import React, { ComponentPropsWithRef, FunctionComponent, useEffect, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'
import * as CommonComponents from '../common'
import MonacoEditor from '../Editor/MonacoEditor/MonacoEditor'

const UtilizerStyled = styled.div`

`

interface UtilizerPropsModel extends ComponentPropsWithRef<'div'> {
  componentData: CommonTypes.ComponentDataModel;
}

const Utilizer: FunctionComponent<UtilizerPropsModel> = (props): JSX.Element => {
  const { className = '', componentData, ...restProps } = props;

  if (!componentData.name) {
    return <></>
  }

  const Component = CommonComponents[componentData.name as keyof typeof CommonComponents] as React.ElementType<any>;
  const resetErrorsFunction = useRef<Function | null>(null)

  function ErrorFallback(props: { error: Error, resetErrorBoundary: Function }) {
    resetErrorsFunction.current = props.resetErrorBoundary;
    return (
      <div role="alert" className='error'>
        <h2>Something went wrong...</h2>
        <h2>Possible reasons</h2>
        <h3>Provided props are not proper.</h3>
        <pre>{props.error.message}</pre>
        <button onClick={props.resetErrorBoundary as any}>Try again</button>
        <h2>Error Stack</h2>
        <MonacoEditor initialValue={props.error.stack} />
      </div>
    )
  }

  useEffect(() => {
    if (typeof resetErrorsFunction.current === 'function') {
      resetErrorsFunction.current()
    }
  }, [componentData])
  
  Object.keys(componentData.schema).forEach(key => {
    let evalResult;
    try {
      evalResult = eval(componentData.schema[key])
    } catch (error) {}
    componentData.schema[key] = evalResult || componentData.schema[key];
  })
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <UtilizerStyled className={`utilizer ${className}`} {...restProps}>
        <Component {...componentData.schema} />
      </UtilizerStyled>
    </ErrorBoundary>
  )
}

export default Utilizer