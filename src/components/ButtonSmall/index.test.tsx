import { ButtonSmall } from '.'
import { render, screen } from '@testing-library/react'

describe('ButtonSmall', () => {
  it('Should show button', () => {
    const { debug } = render(<ButtonSmall>Ativar</ButtonSmall>)
    expect(screen.getByRole('button', { name: /ativar/i }))
    debug()
  })
})
