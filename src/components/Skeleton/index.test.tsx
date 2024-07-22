import { render, screen } from '@testing-library/react'
import { Skeleton } from '.'
describe('Skeleton', () => {
  it('Should render IconButton properly', () => {
    render(
      <Skeleton height="20px" width="20px" data-testid="skeleton-element" />,
    )
    const skeleton = screen.getByTestId('skeleton-element')
    expect(skeleton).toHaveStyle({ height: '20px', width: '20px' })
  })
})
