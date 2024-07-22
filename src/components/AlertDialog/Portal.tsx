import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

export const Portal = ({
  ...props
}: AlertDialogPrimitive.AlertDialogPortalProps) => (
  <AlertDialogPrimitive.Portal {...props} />
)
