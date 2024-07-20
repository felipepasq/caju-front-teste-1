import { api } from '../api'

export const getRegistrations = async (search = '') => {
  let url = '/registrations'
  if (search.length > 0) {
    url += `?cpf=${search}`
  }

  const response = await api.get(url)
  return response.data
}
