import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header', () => {
  it('Should render Header properly', () => {
    render(<Header>Teste header</Header>)
    expect(screen.getByText('Teste header')).toBeVisible()
  })
})
