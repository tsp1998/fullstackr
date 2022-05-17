declare namespace CommonTypes {
  export type inputComponentType = 'input' | 'select' | 'textarea';
  
  export interface CommonInputProps {
    initialValue?: string;
    id: string;
    label?: string | JSX.Element;
  }
}