import { useCallback, useState } from "react";
import * as listApis from '../apis/rest/list.apis'

const useRequest = <DataType = any>() => {
  const [data, setData] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const request = useCallback(async (
    requestType: APITypes.RequestType,
    dataType: 'list' | 'item',
    api: string,
    ...apiFunctionRestParams: Array<any>
  ): Promise<APITypes.ResponseDataType | null> => {
    const apiFunction = dataType === 'list' ? listApis[requestType as keyof typeof listApis] : () => undefined;
    const response = await apiFunction(api, ...apiFunctionRestParams)
    if (response?.status === 'success') {
      setData(response.data)
      return response.data!;
    } else {
      setErrorMessage(response?.data as string || '')
      return null;
    }
  }, [])

  return { data: data as DataType, errorMessage, setErrorMessage, request }
}

export default useRequest;