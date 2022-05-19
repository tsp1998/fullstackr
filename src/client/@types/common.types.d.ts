declare namespace CommonTypes {
  export type inputComponentType = 'input' | 'select' | 'textarea';
  
  export interface CommonInputProps {
    initialValue?: string | boolean;
    id: string;
    label?: string | JSX.Element;
    placeholder?: string;
  }
}