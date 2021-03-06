import React, { ChangeEvent, FormEvent, FormEventHandler, FunctionComponent, useCallback, useEffect, useReducer, useState } from 'react'
//models
import * as FormModels from './Form.models'
//styles
import * as FormStyles from './Form.styles'
//redux
import createItemReducer from '../../../redux/common/item/createItemReducer'
import * as itemNormalActions from '../../../redux/common/item/item.normal.actions'
//components
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'
import Select from '../Select/Select'
import Button from '../Button/Button'
//hooks
import useRequest from '../../../hooks/useRequest';

const inputComponents = {
  input: Input,
  select: Select,
  textarea: Textarea,
}

const trimFormState = (formState: FormModels.FormState): FormModels.TrimmedFormState => {
  return Object.keys(formState).reduce((acc, id) => ({ ...acc, [id]: formState[id].value }), {});
}

const buildFormStateFromInputs = (inputs: Array<FormModels.FormInputModel>) => inputs.reduce((acc, input) => ({
  ...acc,
  [input.id]: {
    value: input.initialValue,
    errorMessage: '',
  }
}), {})

const Form: FunctionComponent<FormModels.FormPropsModel> = (props): JSX.Element => {
  const {
    formSchema: { inputs = [], buttons = [] },
    className = '',
    children,
    formId = 'form',
    inputsContainerChildren,
    buttonsContainerChildren,
    submitHandler: submitHandlerFromProps = () => true,
    onFormStateChange = () => undefined,
    onApiTrigger = () => undefined,
    defaultErrorMessage,
    defaultSuccessMessage,
    wantMessage = false,
    api = '',
    ...restProps
  } = props;
  const initialFormState: FormModels.FormState = buildFormStateFromInputs(inputs)
  const [formState, dispatchFormState] = useReducer(
    createItemReducer(formId, initialFormState), initialFormState
  )
  const [successMessage, setSuccessMessage] = useState(defaultSuccessMessage);
  const { data, errorMessage, loading, request, setErrorMessage, setLoading } = useRequest()

  const inputChangeHandler = useCallback((value: string | boolean, id?: string) => {
    dispatchFormState(itemNormalActions.updateItem(formId, {
      [id!]: { ...formState[id!], value }
    }))
  }, [])

  useEffect(() => {
    const newFormState = buildFormStateFromInputs(inputs);
    dispatchFormState(itemNormalActions.setItem(formId, newFormState))
  }, [inputs])

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSuccessMessage('');
      setErrorMessage('');
      if (api) {
        const apiRequest = request({
          requestType: 'post',
          requestBody: { api, data: { data: trimFormState(formState) } }
        })
        onApiTrigger(apiRequest);
        const response = await apiRequest;
        setSuccessMessage((response.data as any)?.message || 'Submit action was successful...')
      } else {
        setLoading(true);
        await submitHandlerFromProps(trimFormState(formState));
        setLoading(false);
      }
    } catch (error) {
      loading && setLoading(false);
      setErrorMessage((error as Error).message || 'Something went wrong...')
    }
  }

  useEffect(() => {
    onFormStateChange(formState);
  }, [formState])

  return (
    <FormStyles.FormStyled onSubmit={submitHandler} className={`form ${className}`} {...restProps}>
      <FormStyles.FormInputsContainer className='form-inputs-container'>
        {inputs.map(input => {
          const {
            label, inputComponentType = 'input', options = [], ...restInputProps
          } = input;
          const Component = inputComponents[inputComponentType as keyof typeof inputComponents];
          return (
            <div key={restInputProps.id} className="form-group">
              {label && <label htmlFor={restInputProps.id}>{label}</label>}
              <div className="form-control">
                {(
                  //@ts-ignore
                  <Component
                    changeHandler={inputChangeHandler}
                    {...(inputComponentType === 'select' ? { options } : {})}
                    {...restInputProps}
                  />
                )}
              </div>
            </div>
          )
        })}
        {inputsContainerChildren}
      </FormStyles.FormInputsContainer>
      {wantMessage && (
        <FormStyles.FormMessage messageType={errorMessage ? 'error' : 'success'}>
          {errorMessage || successMessage}
        </FormStyles.FormMessage>
      )}
      <FormStyles.FormButtonsContainer className='form-buttons-container'>
        {buttons.map((button, i) => <Button key={i} {...button} />)}
        {buttonsContainerChildren}
      </FormStyles.FormButtonsContainer>
      {children}
    </FormStyles.FormStyled>
  )
}

export default Form