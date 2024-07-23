import { renderHook } from '@testing-library/react-hooks'
import { useSearchParams } from '.'

jest.mock('react-router-dom', () => ({
  useLocation: jest
    .fn()
    .mockReturnValueOnce({ search: '?search=test-value' })
    .mockReturnValueOnce({ search: undefined }),
}))

describe('useSearchParams', () => {
  it('Should return the search parameter when it exists', () => {
    const { result } = renderHook(() => useSearchParams())

    expect(result.current.searchParam).toBe('test-value')
  })

  it('Should return empty string when search parameter doesnt exists', () => {
    const { result } = renderHook(() => useSearchParams())

    expect(result.current.searchParam).toBe('')
  })
})
