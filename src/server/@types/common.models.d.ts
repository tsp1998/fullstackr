declare namespace CommonModels {
  export interface KeyValue<ValueType = any> {
    [key: string]: ValueType
  }
}