import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export const Portal = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Portal>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Portal>
>((props) => <AlertDialogPrimitive.Portal {...props} />)
