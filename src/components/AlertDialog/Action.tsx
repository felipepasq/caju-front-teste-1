import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react'

export const Action = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Action>,
  ComponentPropsWithRef<typeof AlertDialogPrimitive.Action>
>((props, ref) => <AlertDialogPrimitive.Action {...props} ref={ref} />)
