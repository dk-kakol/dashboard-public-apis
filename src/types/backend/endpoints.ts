export enum ApiEndpoints {
  list = 'entries',
  random = 'random',
  categories = 'categories',
  testError = 'test/:id'
}

export type EndpointParams = Record<string, any>;
