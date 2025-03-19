export const removeOrphans = (str: string): string => {
  const newStr = str.replace(/(\s)([\S])[\s]+/g, '$1$2\xa0')
  return newStr.replace(/(\s)([\S][\S])[\s]+/g, '$1$2\xa0')
}
