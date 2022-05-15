declare namespace CommonModels {
  export interface MethodData {
    methodNameOfStorageClass?: string;
    customMethod?: (...params) => Promise<any>;
  }
  export interface KeyValue<ValueType = any> {
    [key: string]: ValueType
  }
  export type CreateControllerFunctionType<ReturnType = any> = (
    StorageClass: any, methodData: MethodData, optionalData: KeyValue
  ) => ReturnType
}