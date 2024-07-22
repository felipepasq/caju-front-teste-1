import { render, screen } from '@testing-library/react'
import { IconButton } from '.'

describe('IconButton', () => {
  it('Should render IconButton properly', () => {
    render(<IconButton>Teste Icon Button</IconButton>)
    expect(screen.getByText('Teste Icon Button')).toBeVisible()
  })
})
