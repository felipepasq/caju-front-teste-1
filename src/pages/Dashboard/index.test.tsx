import { queryRender } from '~/utils'
import { DashboardPage } from '.'
import { screen } from '@testing-library/react'
import { toast } from 'react-toastify'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({ search: undefined }),
  useHistory: jest.fn().mockReturnValue({ replace: jest.fn() }),
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
})
