import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export const Trigger = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>
>((props, ref) => <AlertDialogPrimitive.Trigger {...props} ref={ref} />)
