import { queryRender } from '~/utils'
import { SearchBar } from '.'
import { fireEvent, screen } from '@testing-library/react'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('SearchBar', () => {
  it('Should render properly', () => {
    const mockFn = jest.fn()
    queryRender(<SearchBar search="teste" handleSearch={mockFn} />)
    const input = screen.getByPlaceholderText('Digite um CPF válido')
    expect(input).toBeInTheDocument()
  })
  it('Should call handle search', () => {
    const mockFn = jest.fn()
    queryRender(<SearchBar search="teste" handleSearch={mockFn} />)
    const input = screen.getByPlaceholderText(
      'Digite um CPF válido',
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: '14991091640' } })
    expect(mockFn).toHaveBeenCalled()
  })

  it('Should go to new admission page', async () => {
    const mockFn = jest.fn()
    queryRender(<SearchBar search="teste" handleSearch={mockFn} />)
    const button = screen.getByText('Nova Admissão')
    fireEvent.click(button)
    expect(mockHistoryPush).toHaveBeenCalled()
  })
})
