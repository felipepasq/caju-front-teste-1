import { queryRender } from '~/utils'
import Columns from '.'
import { RegistrationStatus } from '~/types'
import { screen } from '@testing-library/react'

const mockRegistrations = [
  {
    admissionDate: '22/10/2023',
    email: 'luiz@caju.com.br',
    employeeName: 'Luiz Filho',
    status: RegistrationStatus.APPROVED,
    cpf: '56642105087',
    id: '3',
  },
  {
    id: '88bc12e5-0b26-4150-83a6-7c72f9981f38',
    employeeName: 'teste final',
    email: 'teste@gmail.com',
    cpf: '54986738097',
    admissionDate: '01/07/2024',
    status: RegistrationStatus.REPROVED,
  },
  {
    id: '123',
    employeeName: 'teste felipe',
    email: 'teste@gmail.com',
    cpf: '54986738097',
    admissionDate: '01/07/2024',
    status: RegistrationStatus.REVIEW,
  },
]

describe('Columns', () => {
  it('Should render properly', () => {
    queryRender(
      <Columns
        isLoadingRegistrations={false}
        registrations={mockRegistrations}
      />,
    )
    const approvedText = screen.getByText('Aprovado')
    const reprovedText = screen.getByText('Reprovado')
    const reviewText = screen.getByText('Pronto para revisar')

    expect(approvedText).toBeVisible()
    expect(reprovedText).toBeVisible()
    expect(reviewText).toBeVisible()
  })

  it('Should be loading', () => {
    queryRender(
      <Columns isLoadingRegistrations={true} registrations={undefined} />,
    )
    const name = screen.queryByText('Luiz Filho')

    expect(name).toBeNull()
  })
})
