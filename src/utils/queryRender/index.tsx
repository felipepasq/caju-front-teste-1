import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

export function queryRender(component: ReactNode) {
  const queryClient = new QueryClient()

  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  )
}
