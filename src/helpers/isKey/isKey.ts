/**
 * IsKey is function which help iterating over object keys in TypeScript.
 * With type predicates we check that the key is actually on the object before indexing into it
 * source: https://www.totaltypescript.com/iterate-over-object-keys-in-typescript
 * @param x - given object
 * @param k - key to check
 */

export function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x
}
