import { useCallback, useState } from "react";
import restApi from '../apis/rest'

interface RequestFunctionParams {
  requestType: APITypes.RequestType,
  dataType?: 'list' | 'item',
  apiFunctionParams: APITypes.ApiFunctionParams
}

const useRequest = <DataType = any>() => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const request = useCallback(async (
    { requestType, dataType, apiFunctionParams }: RequestFunctionParams
  ): Promise<APITypes.ResponseDataType | null> => {
    setLoading(true);
    const response = await restApi(requestType, ...apiFunctionParams)
    if (response?.status === 'success') {
      setData(response.data)
      setLoading(false)
      return response.data!;
    } else {
      const { message: errorMessage } = (response?.data || {}) as { message: string }
      setErrorMessage(errorMessage || 'Something went wrong...');
      setLoading(false)
      return null;
    }
  }, [])

  return { data: data as DataType, loading, errorMessage, setErrorMessage, request }
}

export default useRequest;