import { ModelOptionsType, SchemaDefinitionType } from "../models/createModel";

export interface ArtifactData {
  name: string;
  itemRoutes: Array<APITypes.RequestType>;
  listRoutes: Array<APITypes.RequestType>;
  middleware?: Array<any>;
  schema: SchemaDefinitionType;
  modelOptions?: ModelOptionsType;
}