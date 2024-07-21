import { TRegistration } from '~/types'
import { api } from '../api'

export const getRegistrations = async (search = '') => {
  let url = '/registrations'
  if (search.length > 0) {
    url += `?cpf=${search}`
  }
  const response = await api.get(url)
  return response.data
}

export const postRegistration = async (registration: TRegistration) => {
  const response = await api.post('/registrations', registration)
  return response.data
}
