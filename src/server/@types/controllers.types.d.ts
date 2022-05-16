declare namespace ControllerTypes {
  export type StorageClassType<Class = any> = new (data: Class) => Class;
  export type StorageClassMethodNameOrCustomMethod = string | Function;

  export interface MethodData {
    methodNameOfStorageClass?: string;
    customMethod?: (...params) => Promise<any>;
  }

  export interface CreateControllerFunctionParams {
    dataType?: ListAndItemTypes.DataType;
    requestType: APITypes.RequestType,
    StorageClass: ControllerTypes.StorageClassType,
    methodData?: ControllerTypes.MethodData,
    optionalData?: CommonModels.KeyValue
  }
  export type createControllerFunctionType<ReturnType = any> = (params: CreateControllerFunctionParams) => ReturnType
}