import { AlertDialog } from '.'
import { fireEvent, render, screen } from '@testing-library/react'
describe('AlertDialog', () => {
  it('should render and open properly', () => {
    render(
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button>Delete account</button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialog.Description>
            <AlertDialog.Cancel asChild>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action asChild>Yes, delete account</AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    )

    const trigger = screen.getByText('Delete account')
    fireEvent.click(trigger)
    const text = screen.getByText('Are you absolutely sure?')
    expect(text).toBeVisible
  })
})
