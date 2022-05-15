import axios from 'axios'

export const get = async <RequestBodyModel = APITypes.RequestBodyModel>(api: string, requestBody?: RequestBodyModel): Promise<APITypes.ResponseModel> => {
  try {
    const { config } = requestBody as APITypes.RequestBodyModel || {};
    const response = await axios.get(api, config);
    console.log(`response`, response)
    return { status: 'success', data: response.data }
  } catch (error) {
    console.log(`error`, error)
    return { status: 'error', data: (error as Error).message }
  }
}