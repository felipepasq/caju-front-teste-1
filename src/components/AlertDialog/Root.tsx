import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export const Root = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>
>((props) => <AlertDialogPrimitive.Root {...props} />)
