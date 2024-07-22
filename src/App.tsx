import Router from '~/router'
import { Header } from './components/Header'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/queryClient'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
      <ToastContainer
        hideProgressBar={true}
        position="top-center"
        pauseOnHover
      />
    </QueryClientProvider>
  )
}

export default App
