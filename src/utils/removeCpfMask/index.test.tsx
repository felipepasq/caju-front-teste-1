import { removeCpfMask } from '.'

describe('removeCpfMask', () => {
  it('Should return an empty string when input is empty', () => {
    expect(removeCpfMask('')).toBe('')
  })

  it('Should return the same string when input contains only numbers', () => {
    expect(removeCpfMask('12345678901')).toBe('12345678901')
  })

  it('Should remove mask from a formatted CPF', () => {
    expect(removeCpfMask('123.456.789-01')).toBe('12345678901')
  })

  it('Should remove non-numeric characters from an incomplete CPF', () => {
    expect(removeCpfMask('123.456')).toBe('123456')
    expect(removeCpfMask('123.456.789')).toBe('123456789')
    expect(removeCpfMask('123.456.789-0')).toBe('1234567890')
  })

  it('Should remove all non-numeric characters from a string', () => {
    expect(removeCpfMask('1a2b3c4d5e6f7g8h9i0j1')).toBe('12345678901')
  })
})
