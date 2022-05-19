import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { BackendPreviewPropsModel } from './BackendPreview.models'
import * as BackendPreviewStyles from './BackendPreview.styles'
//constants
import { API } from '../../constants/api.constants'
//components
import Accordion from '../common/Accordion/Accordion'
import { AccordionItemModel } from '../common/Accordion/Accordion.models'
import MonacoEditor from '../Editor/MonacoEditor/MonacoEditor'
import Button from '../common/Button/Button'
import Form from '../common/Form/Form'
import { FormState, TrimmedFormState } from '../common/Form/Form.models'
//hooks
import useRequest from '../../hooks/useRequest'

const getRouteName = (artifactName: string, id: string) => {
  const [dataType, requestType] = id.split('-') as [ListAndItemTypes.DataType, APITypes.RequestType];
  const routeName = `/${artifactName}${dataType === 'list' ? 's' : requestType !== 'post' ? `/:${artifactName}Id` : ''}`;
  return routeName;
}

const BackendPreview: FunctionComponent<BackendPreviewPropsModel> = (props): JSX.Element => {
  const { className = '', formState = {}, ...restProps } = props;
  const { artifactName = {}, ...restFormState } = formState;
  const { pathname } = window.location;
  const [postData, setPostData] = useState('')
  const [patchData, setPatchData] = useState('')
  const [apis, setApis] = useState<{ [id: string]: string }>({})
  const { data, request } = useRequest();
  const [responses, setResponses] = useState<{ [id: string]: string }>({})

  const triggerApiCall = async (id: string) => {
    try {
      setResponses({ ...responses, [id]: `Please wait...` })
      const [dataType, requestType] = id.split('-') as [ListAndItemTypes.DataType, APITypes.RequestType];
      const response = await request({
        requestType,
        requestBody: {
          api: apis[id],
          ...(requestType === 'post' ? { data: JSON.parse(postData) } : {}),
          ...(requestType === 'patch' ? { data: JSON.parse(patchData) } : {}),
        }
      });
      setResponses({ ...responses, [id]: JSON.stringify(response.data) })
    } catch (error) {
      setResponses({ ...responses, [id]: `Something Went Wrong` })
    }
    return Promise.resolve(true)
  }


  const normalizeApi = (formState: TrimmedFormState, id: string) => {
    const [dataType, requestType] = id.split('-') as [ListAndItemTypes.DataType, APITypes.RequestType];
    const api = apis[id] || `${API}/${pathname.slice(pathname.indexOf('-') + 1)}${getRouteName((artifactName as any).value, id)}`
    const newApi = requestType === 'post' || dataType === 'list' ? api : api.slice(0, api.lastIndexOf('/') + 1) + ((formState[`${(artifactName as any).value}Id`] as any)?.value || '')
    if (apis[id] === newApi) {
      return
    }
    setApis({ ...apis, [id]: newApi })
  }

  const copyApi = async (id: string) => {
    if (!apis[id]) {
      return
    }
    await navigator.clipboard.writeText(apis[id]);
  }

  useEffect(() => {
    setApis({})
    setResponses({})
    setPostData('')
    setPatchData('')
  }, [formState])

  return (
    <BackendPreviewStyles.BackendPreviewStyled
      className={`backend-preview ${className}`}
      {...restProps}
    >
      <Accordion
        items={
          Object.keys(restFormState).reduce(
            (acc: Array<AccordionItemModel>, id: string): Array<AccordionItemModel> => {
              const [dataType, requestType] = id.split('-')
              if ((restFormState[id] as any).value) {
                return [...acc, {
                  heading: (
                    <div className='accordion-item-heading-wrapper'>
                      <div className='route'>
                        {`${getRouteName((artifactName as any).value, id)}`}
                      </div>
                      <div className='request-type'>
                        {requestType.toUpperCase()}
                      </div>
                      <Button onClick={() => copyApi(id)}>Copy API</Button>
                      <Form
                        formSchema={{
                          inputs: requestType === 'post' || dataType === 'list' ? [] : [
                            {
                              id: `${(artifactName as any).value}Id`,
                              placeholder: `${(artifactName as any).value} id`,
                              ...(apis[id] ? {
                                initialValue: apis[id].slice(apis[id].lastIndexOf('/') + 1)
                              } : {})
                            }
                          ],
                          buttons: [{ children: 'Trigger', type: 'submit' }]
                        }}
                        onFormStateChange={formState => normalizeApi(formState, id)}
                        submitHandler={() => triggerApiCall(id)}
                      />
                    </div>
                  ),
                  body: (
                    <>
                      <MonacoEditor
                        {...(requestType === 'post' ? { changeHandler: setPostData } : {})}
                        {...(requestType === 'post' ? { initialValue: postData } : {})}
                        {...(requestType === 'get' || requestType === 'delete' ? { initialValue: responses[id] || '' } : {})}
                        {...(requestType === 'patch' ? { changeHandler: setPatchData } : {})}
                        {...(requestType === 'patch' ? { initialValue: patchData } : {})}
                        language='json'
                        options={{ readOnly: requestType === 'get' || requestType === 'delete' }}
                      />
                      {(requestType === 'post' || requestType === 'patch') && (
                        <MonacoEditor
                          language='json'
                          initialValue={responses[id] || ''}
                          options={{ readOnly: true }}
                        />
                      )}
                    </>
                  )
                }]
              }
              return acc
            },
            []
          )
        }
      />
    </BackendPreviewStyles.BackendPreviewStyled>
  )
}

export default BackendPreview