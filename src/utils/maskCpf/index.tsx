export const maskCpf = (value: string) => {
  console.log(value)
  if (!value) return ''
  const cleanedValue = value.replace(/\D/g, '')

  return cleanedValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}
