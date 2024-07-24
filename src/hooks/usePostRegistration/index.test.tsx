import { renderHook, act } from '@testing-library/react-hooks'
import { usePostRegistration } from '.'
import { postRegistration } from '~/services'
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
const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({ search: undefined }),
  useHistory: () => ({
    push: mockPush,
  }),
}))

jest.mock('~/services', () => ({
  postRegistration: jest.fn(),
}))

const mockPost = postRegistration as jest.Mock

describe('usePatchRegistration', () => {
  const queryClient = new QueryClient()
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should patch registration successfully', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => usePostRegistration(), { wrapper })
    act(() => {
      result.current.postMutateRegistration({
        id: '123',
        employeeName: 'teste final',
        email: 'felipe@gmail.com.br',
        cpf: '54986738097',
        admissionDate: '01/07/2024',
        status: RegistrationStatus.REPROVED,
      })
    })
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    expect(postRegistration).toHaveBeenCalledWith({
      id: '123',
      employeeName: 'teste final',
      email: 'felipe@gmail.com.br',
      cpf: '54986738097',
      admissionDate: '01/07/2024',
      status: RegistrationStatus.REPROVED,
    })
    expect(toast.success).toHaveBeenCalledWith(
      'Usuário adicionado com sucesso!',
    )
  })
  it('Should handle error when patching registration', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    mockPost.mockRejectedValueOnce(new Error('Error deleting user'))
    const { result } = renderHook(() => usePostRegistration(), { wrapper })

    act(() => {
      result.current.postMutateRegistration({
        id: '123',
        employeeName: 'teste final',
        email: 'felipe@gmail.com.br',
        cpf: '54986738097',
        admissionDate: '01/07/2024',
        status: RegistrationStatus.REPROVED,
      })
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(postRegistration).toHaveBeenCalledWith({
      id: '123',
      employeeName: 'teste final',
      email: 'felipe@gmail.com.br',
      cpf: '54986738097',
      admissionDate: '01/07/2024',
      status: RegistrationStatus.REPROVED,
    })
    expect(toast.error).toHaveBeenCalledWith('Erro ao adicionar usuário')
  })
})
