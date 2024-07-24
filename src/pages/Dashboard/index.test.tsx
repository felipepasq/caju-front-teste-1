import { queryRender } from '~/utils'
import { DashboardPage } from '.'
import { fireEvent, screen } from '@testing-library/react'
import { toast } from 'react-toastify'

const mockReplace = jest.fn()
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({ search: undefined }),
  useHistory: () => ({
    replace: mockReplace,
  }),
}))

jest.mock('~/hooks', () => ({
  useGetRegistrations: jest.fn().mockReturnValue({ isError: true }),
  useSearchParams: jest.fn().mockReturnValue({ search: undefined }),
}))

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should render properly', () => {
    queryRender(<DashboardPage />)
    const text = screen.getByText('Pronto para revisar')
    expect(text).toBeVisible()
  })

  it('Should show call error toast function', () => {
    queryRender(<DashboardPage />)

    expect(toast.error).toHaveBeenCalledWith(
      'Ocorreu um erro ao carregar os registros.',
    )
  })

  it('Should call replace', () => {
    queryRender(<DashboardPage />)

    const input = screen.getByPlaceholderText('Digite um CPF válido')
    expect(input).toBeVisible()

    fireEvent.change(input, { target: { value: '54986738097' } })
    expect(mockReplace).toHaveBeenCalled()
  })
})
