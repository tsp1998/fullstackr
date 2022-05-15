declare namespace APITypes {
  export type RequestType = 'get' | 'post' | 'put' | 'patch' | 'delete';
  export type ResponseDataType = string | number | object | boolean;
  export type ApiFunctionParams<Data = any, Config = any> = [string, Data?, Config?];
  export interface ResponseModel {
    data?: ResponseDataType;
    status: 'success' | 'error';
  }
}