import { renderHook, act } from '@testing-library/react-hooks'

import { useDeleteRegistration } from '.'
import { deleteRegistration } from '~/services'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ReactNode } from 'react'

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
  deleteRegistration: jest.fn(),
}))

const mockDelete = deleteRegistration as jest.Mock

describe('useDeleteRegistration', () => {
  const queryClient = new QueryClient()
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should delete registration successfully', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useDeleteRegistration(), { wrapper })
    act(() => {
      result.current.deleteRegistrationMutate({ id: '123' })
    })
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    expect(deleteRegistration).toHaveBeenCalledWith('123')
    expect(toast.success).toHaveBeenCalledWith('Usuário deletado com sucesso!')
  })
  it('Should handle error when deleting registration', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useDeleteRegistration(), { wrapper })

    act(() => {
      result.current.deleteRegistrationMutate({ id: '123' })
    })

    mockDelete.mockRejectedValueOnce(new Error('Error deleting user'))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(deleteRegistration).toHaveBeenCalledWith('123')
    expect(toast.error).toHaveBeenCalledWith(
      'Ocorreu um erro ao deletar o usuário',
    )
  })
})
