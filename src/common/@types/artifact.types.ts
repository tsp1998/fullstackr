import { SchemaDefinitionProperty, SchemaOptions } from 'mongoose'
import { RequestHandler } from "express";
export type SchemaDefinitionType = { [id: string]: SchemaDefinitionProperty };
export type ModelOptionsType = SchemaOptions;

export interface ArtifactData {
  name: string;
  itemRoutes: Array<APITypes.RequestType>;
  listRoutes: Array<APITypes.RequestType>;
  middleware?: Array<RequestHandler>;
  schema: SchemaDefinitionType;
  modelOptions?: ModelOptionsType;
}