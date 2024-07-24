export * from 'zod';

declare module "zod" {
  interface ZodString {
    excludeSpecialRefine(): this;
  }
}