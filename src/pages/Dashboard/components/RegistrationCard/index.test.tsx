import { queryRender } from '~/utils'
import RegistrationCard from '.'
import { RegistrationStatus } from '~/types'
import { fireEvent, screen } from '@testing-library/react'

const mockPatchRegistrationMutate = jest.fn()
const mockDeleteRegistrationMutate = jest.fn()
const mockIsDeleting = jest.fn().mockReturnValue(() => false)

jest.mock('~/hooks', () => ({
  usePatchRegistration: () => ({
    patchRegistrationMutate: mockPatchRegistrationMutate,
  }),
  useDeleteRegistration: () => ({
    deleteRegistrationMutate: mockDeleteRegistrationMutate,
  }),
}))

const mockRegistrationReview = {
  id: '1',
  admissionDate: '22/10/2023',
  email: 'filipe@caju.com.br',
  employeeName: 'Filipe Marins',
  status: RegistrationStatus.REVIEW,
  cpf: '78502270001',
}

const mockRegistrationReproved = {
  id: '1',
  admissionDate: '22/10/2023',
  email: 'filipe@caju.com.br',
  employeeName: 'Filipe Marins',
  status: RegistrationStatus.REPROVED,
  cpf: '78502270001',
}

const mockRegistrationApproved = {
  id: '1',
  admissionDate: '22/10/2023',
  email: 'filipe@caju.com.br',
  employeeName: 'Filipe Marins',
  status: RegistrationStatus.APPROVED,
  cpf: '78502270001',
}

describe('RegistrationCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should render properly', () => {
    queryRender(<RegistrationCard registration={mockRegistrationReview} />)
    const text = screen.getByText('Filipe Marins')
    expect(text).toBeInTheDocument()
  })

  it('Should call patchRegistrationMutate', () => {
    queryRender(<RegistrationCard registration={mockRegistrationReview} />)
    const button = screen.getByText('Aprovar')
    fireEvent.click(button)
    const confirmButton = screen.getByText('Confirmar')
    fireEvent.click(confirmButton)
    expect(mockPatchRegistrationMutate).toHaveBeenCalled()
  })

  it('Should call deleteRegistrationMutate', () => {
    queryRender(<RegistrationCard registration={mockRegistrationReview} />)
    const button = screen.getByTestId('btn-delete')
    fireEvent.click(button)
    const confirmButton = screen.getByText('Confirmar')
    fireEvent.click(confirmButton)
    expect(mockDeleteRegistrationMutate).toHaveBeenCalled()
  })

  it('Should close alert', () => {
    queryRender(<RegistrationCard registration={mockRegistrationReview} />)
    const button = screen.getByText('Aprovar')
    fireEvent.click(button)
    const alertText = screen.getByText('Você tem certeza?')
    expect(alertText).toBeVisible()
    const cancelButton = screen.getByText('Cancelar')
    fireEvent.click(cancelButton)
    expect(alertText).not.toBeVisible()
  })

  it('Should render buttons correctly when status is REPROVED', () => {
    queryRender(<RegistrationCard registration={mockRegistrationReproved} />)
    const button = screen.getByText('Revisar novamente')
    expect(button).toBeInTheDocument()
  })

  it('Should render buttons correctly when status is APPROVED', () => {
    queryRender(<RegistrationCard registration={mockRegistrationApproved} />)
    const button = screen.getByText('Revisar novamente')
    expect(button).toBeInTheDocument()
  })

  it('Should render alert when clicked on review again on a approved card', () => {
    queryRender(<RegistrationCard registration={mockRegistrationApproved} />)
    const button = screen.getByText('Revisar novamente')
    fireEvent.click(button)
    const text = screen.getByText(
      'Essa ação mandar o usuário Filipe Marins para revisão.',
    )
    expect(text).toBeVisible()
  })

  it('Should render alert when clicked on review again on a reproved card', () => {
    queryRender(<RegistrationCard registration={mockRegistrationReproved} />)
    const button = screen.getByText('Revisar novamente')
    fireEvent.click(button)
    const text = screen.getByText(
      'Essa ação mandar o usuário Filipe Marins para revisão.',
    )
    expect(text).toBeVisible()
    const confirmButton = screen.getByText('Confirmar')
    fireEvent.click(confirmButton)
    expect(mockPatchRegistrationMutate).toHaveBeenCalled()
  })

  it('Should reprove a registration', () => {
    queryRender(<RegistrationCard registration={mockRegistrationReview} />)
    const button = screen.getByText('Reprovar')
    fireEvent.click(button)
    const text = screen.getByText(
      'Essa ação vai reprovar o usuário Filipe Marins.',
    )
    expect(text).toBeVisible()
  })
})
