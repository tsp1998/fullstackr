import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const restApi = async (
  requestType: APITypes.RequestType, ...params: APITypes.ApiFunctionParams
): Promise<APITypes.ResponseModel> => {
  try {
    const response = await axios[requestType](...params);
    return { status: 'success', data: response.data }
  } catch (error) {
    const { response } = error as AxiosError;
    if (response?.data) {
      return { status: 'error', data: response.data as any }
    }
    return { status: 'error', data: { message: (error as Error).message } }
  }
}

export default restApi