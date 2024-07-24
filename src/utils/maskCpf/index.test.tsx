import { maskCpf } from '.'
describe('maskCpf', () => {
  it('Should return an empty string when input is empty', () => {
    expect(maskCpf('')).toBe('')
  })

  it('Should return an empty string when input contains no numbers', () => {
    expect(maskCpf('abc.def.ghi-jk')).toBe('')
  })

  it('Should format a valid CPF correctly', () => {
    expect(maskCpf('12345678901')).toBe('123.456.789-01')
  })

  it('Should format an incomplete CPF correctly', () => {
    expect(maskCpf('123456')).toBe('123.456')
    expect(maskCpf('123456789')).toBe('123.456.789')
    expect(maskCpf('1234567890')).toBe('123.456.789-0')
  })

  it('Should truncate input longer than 11 digits', () => {
    expect(maskCpf('123456789012345')).toBe('123.456.789-01')
  })

  it('Should handle input with non-numeric characters', () => {
    expect(maskCpf('123.456.789-01')).toBe('123.456.789-01')
    expect(maskCpf('123-456.789.01')).toBe('123.456.789-01')
    expect(maskCpf('123abc456def78901')).toBe('123.456.789-01')
  })
})
