const keysToCheckMap: { [key: string]: string } = {
  phone: 'Phone number already exists.'
}

export const extractMongoDBError = (error: Error) => {
  const errorMessageOrStack = error.stack || error.message || '';
  if (!errorMessageOrStack) {
    return;
  }
  if (errorMessageOrStack.indexOf('duplicate key') > -1) {
    for (const key in keysToCheckMap) {
      if (errorMessageOrStack.indexOf(key) > -1) {
        return keysToCheckMap[key];
      }
    }
  }
}