export enum ApiEndpoints {
  list = 'api-entries',
  random = 'random',
  categories = 'categories',
  testError = 'test/:id'
}

export type EndpointParams = Record<string, any>;
