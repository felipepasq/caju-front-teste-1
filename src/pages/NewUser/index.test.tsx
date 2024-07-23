import { queryRender } from '~/utils'
import { NewUserPage } from '.'
import { fireEvent, screen, waitFor } from '@testing-library/react'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const mockPostMutateRegistration = jest.fn()
let mockIsPosting = false
jest.mock('~/hooks', () => ({
  usePostRegistration: () => ({
    postMutateRegistration: mockPostMutateRegistration,
    isPosting: mockIsPosting,
  }),
}))

jest.mock('uuid', () => ({
  v4: () => '123',
}))

describe('NewUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should render properly', () => {
    queryRender(<NewUserPage />)
    const label = screen.getByText('Nome')
    expect(label).toBeInTheDocument()
  })

  it('Should render button loading', () => {
    mockIsPosting = true
    queryRender(<NewUserPage />)
    const button = screen.getByText('Carregando...')
    expect(button).toBeInTheDocument()
    mockIsPosting = false
  })

  it('Should go to dashboard', () => {
    queryRender(<NewUserPage />)
    const button = screen.getAllByRole('button')[0]
    fireEvent.click(button)
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard')
  })

  it('Should show error on name validation', async () => {
    queryRender(<NewUserPage />)
    const input = screen.getByPlaceholderText('Nome') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Felipe p' } })
    await waitFor(() => {
      const validationText = screen.getByText(
        'Você deve colocar seu nome completo.',
      )
      expect(validationText).toBeInTheDocument()
    })
  })

  it('Should show error on email validation', async () => {
    queryRender(<NewUserPage />)
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Felipe@.com' } })
    await waitFor(() => {
      const validationText = screen.getByText('Esse email não é válido')
      expect(validationText).toBeInTheDocument()
    })
  })

  it('Should show error on cpf validation', async () => {
    queryRender(<NewUserPage />)
    const input = screen.getByPlaceholderText('CPF') as HTMLInputElement
    fireEvent.change(input, { target: { value: '149.910.913-33' } })
    await waitFor(() => {
      const validationText = screen.getByText('Digite um CPF válido.')
      expect(validationText).toBeInTheDocument()
    })
  })

  it('Should close alert', async () => {
    queryRender(<NewUserPage />)

    const nameInput = screen.getByPlaceholderText('Nome')
    const emailInput = screen.getByPlaceholderText('Email')
    const cpfInput = screen.getByPlaceholderText('CPF') as HTMLInputElement
    const dateInput = screen.getByTestId('input-date')
    fireEvent.change(nameInput, { target: { value: 'Felipe Pasqua' } })
    fireEvent.change(emailInput, { target: { value: 'felipe2024@gmail.com' } })
    fireEvent.change(cpfInput, { target: { value: '365.661.100-97' } })
    fireEvent.change(dateInput, {
      target: {
        value: '2024-07-23',
      },
    })

    const button = screen.getByText('Cadastrar')
    await waitFor(() => {
      expect(button).toBeEnabled()
      fireEvent.click(button)
    })
    const cancelButton = screen.getByText('Cancelar')
    fireEvent.click(cancelButton)

    expect(cancelButton).not.toBeVisible()
  })

  it('Should submit form successfully', async () => {
    queryRender(<NewUserPage />)

    const nameInput = screen.getByPlaceholderText('Nome')
    const emailInput = screen.getByPlaceholderText('Email')
    const cpfInput = screen.getByPlaceholderText('CPF') as HTMLInputElement
    const dateInput = screen.getByTestId('input-date')
    fireEvent.change(nameInput, { target: { value: 'Felipe Pasqua' } })
    fireEvent.change(emailInput, { target: { value: 'felipe2024@gmail.com' } })
    fireEvent.change(cpfInput, { target: { value: '365.661.100-97' } })
    fireEvent.change(dateInput, {
      target: {
        value: '2024-07-23',
      },
    })

    const button = screen.getByText('Cadastrar')
    await waitFor(() => {
      expect(button).toBeEnabled()
      fireEvent.click(button)
    })
    const confirmButton = screen.getByText('Confirmar')
    expect(confirmButton).toBeVisible()
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(confirmButton).not.toBeVisible()
    })

    expect(mockPostMutateRegistration).toHaveBeenCalledWith({
      id: '123',
      admissionDate: '23/07/2024',
      email: 'felipe2024@gmail.com',
      employeeName: 'Felipe Pasqua',
      status: 'REVIEW',
      cpf: '36566110097',
    })
  })
})
