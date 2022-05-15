declare namespace APITypes {
  export type RequestType = 'get' | 'post' | 'patch' | 'delete';
  export type ResponseDataType = string | number | object | boolean;
  export interface RequestBodyModel {
    data?: ResponseDataType;
    config?: any;
  }
  export interface ResponseModel {
    data?: ResponseDataType;
    status: 'success' | 'error';
  }
}