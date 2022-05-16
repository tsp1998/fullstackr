declare namespace APITypes {
  export type RequestType = 'get' | 'post' | 'put' | 'patch' | 'delete';
  export type ResponseDataType = string | number | object | boolean;
  export interface RequestBody<Data = any, Config = any> {
    api: string;
    data?: Data;
    config?: Config;
  }
  export interface ResponseModel {
    data?: ResponseDataType;
    status: 'success' | 'error';
  }
}