import { fireEvent, render, screen } from '@testing-library/react'
import TextField from '.'

describe('TextField', () => {
  it('Should render TextField properly', () => {
    render(<TextField data-testid="input" />)
    const inputElement = screen.getByTestId('input') as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    fireEvent.change(inputElement, { target: { value: 'Olá teste' } })
    expect(inputElement.value).toBe('Olá teste')
  })

  it('Should show error message', () => {
    render(<TextField error="Erro" />)
    const errorText = screen.getByText('Erro')
    expect(errorText).toBeVisible()
  })
})
