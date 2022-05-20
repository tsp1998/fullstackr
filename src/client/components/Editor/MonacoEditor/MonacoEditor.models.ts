import { EditorProps } from "@monaco-editor/react";
import { ComponentPropsWithRef } from "react";

export interface MonacoEditorPropsModel extends EditorProps {
  changeHandler?: (value: string) => void;
  initialValue?: string;
  format?: boolean;
  syntaxValidation?: boolean;
}