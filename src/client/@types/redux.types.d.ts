declare namespace ReduxTypes {
  export interface ActionModel {
    type: string;
    payload?: string | object | Error | boolean | number;
  }

  export interface OptionalActionDataModel {
    
  }
}