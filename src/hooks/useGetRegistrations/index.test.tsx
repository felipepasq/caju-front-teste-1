import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react-hooks'
import { act, ReactNode } from 'react'
import { useGetRegistrations } from '.'
import { getRegistrations } from '~/services'

jest.mock('~/services', () => ({
  getRegistrations: jest.fn(),
}))

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('../useSearchParams', () => ({
  useSearchParams: jest.fn().mockReturnValue({ search: undefined }),
}))

const mockGetRegistrations = getRegistrations as jest.Mock
const mockRegistrations = {
  registrations: [
    {
      admissionDate: '22/10/2023',
      email: 'luiz@caju.com.br',
      employeeName: 'Luiz Filho',
      status: 'REVIEW',
      cpf: '56642105087',
      id: '3',
    },
    {
      id: '88bc12e5-0b26-4150-83a6-7c72f9981f38',
      employeeName: 'teste final',
      email: 'teste@gmail.com',
      cpf: '14991091640',
      admissionDate: '01/07/2024',
      status: 'REPROVED',
    },
  ],
}

describe('useGetRegistrations', () => {
  const queryClient = new QueryClient()
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should fetch registrations correctly', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    mockGetRegistrations.mockResolvedValueOnce(mockRegistrations)
    const { result } = renderHook(() => useGetRegistrations(), { wrapper })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    expect(result.current.registrations).toBe(mockRegistrations)
  })
})
