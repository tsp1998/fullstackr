import React, { ChangeEvent, FormEvent, FormEventHandler, FunctionComponent, useCallback, useReducer } from 'react'
//models
import * as FormModels from './Form.models'
//styles
import * as FormStyles from './Form.styles'
//redux
import createItemReducer from '../../../redux/common/item/createItemReducer'
import * as itemNormalActions from '../../../redux/common/item/item.normal.actions'
//components
import Input from '../Input/Input'
import Button from '../Button/Button'
//hooks
import useRequest from '../../../hooks/useRequest';

const inputComponents = {
  input: Input
}

const trimFormState = (formState: FormModels.FormState): FormModels.TrimmedFormState => {
  return Object.keys(formState).reduce((acc, id) => ({ ...acc, [id]: formState[id].value }), {});
}

const Form: FunctionComponent<FormModels.FormPropsModel> = (props): JSX.Element => {
  const {
    formSchema: { inputs = [], buttons = [] },
    className = '',
    children,
    inputsContainerChildren,
    buttonsContainerChildren,
    submitHandler: submitHandlerFromProps = () => true,
    api = '',
    ...restProps
  } = props;
  const initialFormState: FormModels.FormState = inputs.reduce((acc, input) => ({
    ...acc,
    [input.id]: {
      value: input.initialValue,
      errorMessage: '',
    }
  }), {})
  const [formState, dispatchFormState] = useReducer(
    createItemReducer('form', initialFormState), initialFormState
  )
  const { data, errorMessage, loading, request, setErrorMessage, setLoading } = useRequest()

  const inputChangeHandler = useCallback((value: string, id?: string) => {
    dispatchFormState(itemNormalActions.updateItem('form', {
      [id!]: { ...formState[id!], value }
    }))
  }, [])

  // console.log(`formState`, formState)
  console.log(`data`, data)
  console.log(`loading`, loading)
  console.log(`errorMessage`, errorMessage)

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (api) {
        await request({
          requestType: 'post',
          requestBody: { api, data: { data: trimFormState(formState)} }
        })
      } else {
        setLoading(true);
        await submitHandlerFromProps(trimFormState(formState));
        setLoading(false);
      }
    } catch (error) {
      loading && setLoading(false);
      setErrorMessage((error as Error).message)
    }
  }

  return (
    <FormStyles.FormStyled onSubmit={submitHandler} className={`form ${className}`} {...restProps}>
      <FormStyles.FormInputsContainer className='form-inputs-container'>
        {inputs.map(input => {
          const { initialValue, label, inputComponentType = 'input', ...restInputProps } = input;
          const Component = inputComponents[inputComponentType as keyof typeof inputComponents];
          return (
            <div key={restInputProps.id} className="form-group">
              {label && <label htmlFor={restInputProps.id}>{label}</label>}
              <div className="form-control">
                <Component
                  changeHandler={inputChangeHandler}
                  value={formState[restInputProps.id].value}
                  {...restInputProps}
                />
              </div>
            </div>
          )
        })}
        {inputsContainerChildren}
      </FormStyles.FormInputsContainer>
      <FormStyles.FormButtonsContainer className='form-buttons-container'>
        {buttons.map((button, i) => <Button key={i} {...button} />)}
        {buttonsContainerChildren}
      </FormStyles.FormButtonsContainer>
      {children}
    </FormStyles.FormStyled>
  )
}

export default Form