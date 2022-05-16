declare namespace ListAndItemTypes {
  export type DataType = 'list' | 'item';
  export type Item = string | number | boolean | object;
  export type List = Array<Item>
}