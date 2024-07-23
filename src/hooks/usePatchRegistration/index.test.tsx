import { renderHook, act } from '@testing-library/react-hooks'
import { usePatchRegistration } from '.'
import { patchRegistration } from '~/services'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ReactNode } from 'react'
import { RegistrationStatus } from '~/types'

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}))

jest.mock('~/services', () => ({
  patchRegistration: jest.fn(),
}))

const mockPatch = patchRegistration as jest.Mock

describe('usePatchRegistration', () => {
  const queryClient = new QueryClient()
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should patch registration successfully', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => usePatchRegistration(), { wrapper })
    act(() => {
      result.current.patchRegistrationMutate({
        id: '123',
        status: RegistrationStatus.REVIEW,
      })
    })
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    expect(patchRegistration).toHaveBeenCalledWith('123', 'REVIEW')
  })
  it('Should handle error when patching registration', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    mockPatch.mockRejectedValueOnce(new Error('Error deleting user'))
    const { result } = renderHook(() => usePatchRegistration(), { wrapper })

    act(() => {
      result.current.patchRegistrationMutate({
        id: '123',
        status: RegistrationStatus.REVIEW,
      })
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(patchRegistration).toHaveBeenCalledWith('123', 'REVIEW')
    expect(toast.error).toHaveBeenCalledWith(
      'Erro ao atualizar estado do usuário.',
    )
  })
})
