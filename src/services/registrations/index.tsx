import { RegistrationStatus, TRegistration } from '~/types'
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

export const patchRegistration = async (
  id: string,
  status: RegistrationStatus,
) => {
  const response = await api.patch(`/registrations/${id}`, { status })
  return response.data
}

export const deleteRegistration = async (id: string) => {
  const response = await api.delete(`/registrations/${id}`)
  return response.data
}
