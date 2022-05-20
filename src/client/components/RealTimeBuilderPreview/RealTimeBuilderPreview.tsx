import React, { FunctionComponent, useEffect, useRef } from 'react'
import { RealTimeBuilderPreviewPropsModel } from './RealTimeBuilderPreview.models'
import * as RealTimeBuilderPreviewStyles from './RealTimeBuilderPreview.styles'

const html = `
  <html>
    <head>
      <style>html { background-color: white; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        };

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        });

        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

const RealTimeBuilderPreview: FunctionComponent<RealTimeBuilderPreviewPropsModel> = (props): JSX.Element => {
  const {className = '', code, errorMessage, ...restProps} = props;
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <RealTimeBuilderPreviewStyles.RealTimeBuilderPreviewStyled
      className={`real-time-builder-preview ${className}`}
      {...restProps}
    >
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {errorMessage && <div className="preview-error">{errorMessage}</div>}
    </RealTimeBuilderPreviewStyles.RealTimeBuilderPreviewStyled>
  )
}

export default RealTimeBuilderPreview