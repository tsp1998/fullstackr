import * as mongodbErrors from './mongodb.errors'

export const transformErrorMessage = (error: Error) => {
  const errorMessageOrStack = error.stack || error.message || '';
  if (!errorMessageOrStack) {
    return;
  }
  if (
    errorMessageOrStack.indexOf('mongo') > -1 ||
    errorMessageOrStack.indexOf('Mongo') > -1 ||
    errorMessageOrStack.indexOf('MONGO') > -1
  ) {
    return mongodbErrors.extractMongoDBError(error)
  }
}