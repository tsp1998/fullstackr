import { Schema, model, SchemaDefinitionProperty, SchemaOptions } from 'mongoose'

export type SchemaDefinitionType = { [id: string]: SchemaDefinitionProperty };
export type ModelOptionsType = SchemaOptions;

const createModel = (
  modelName: string,
  schema: SchemaDefinitionType,
  options: ModelOptionsType = {}
) => {
  const modelSchema = new Schema(schema, { timestamps: true, ...options })
  const Model = model(modelName, modelSchema);
  return Model;
}

export default createModel;