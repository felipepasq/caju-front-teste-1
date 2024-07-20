import { api } from '../api'

export const getRegisters = async () => {
  const response = await api.get('/registrations')
  return response.data
}
