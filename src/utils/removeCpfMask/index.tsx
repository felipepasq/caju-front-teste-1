export const removeCpfMask = (value: string) => {
  return value.replace(/\D/g, '')
}
