import { Schema, model } from 'mongoose'
import { ModelOptionsType, SchemaDefinitionType } from '../../common/@types/artifact.types'

const DataClasses = { String, Number, Boolean, Array, Date, Buffer, }

const createModel = (
  modelName: string,
  schema: SchemaDefinitionType,
  options: ModelOptionsType = {}
) => {
  schema = Object.keys(schema).reduce((acc, propName) => ({
    ...acc,
    [propName]: {
      ...schema[propName] as object,
      type: DataClasses[(schema[propName] as any).type]
    }
  }), {})
  const modelSchema = new Schema(schema, { timestamps: true, ...options })
  const Model = model(modelName, modelSchema);
  return Model;
}

export default createModel;