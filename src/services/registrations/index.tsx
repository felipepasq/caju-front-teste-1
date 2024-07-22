import { RegistrationStatus, TRegistration } from '~/types'
import { api } from '../api'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getRegistrations = async (search = '') => {
  await delay(1000)
  let url = '/registrations'
  if (search.length > 0) {
    url += `?cpf=${search}`
  }
  const response = await api.get(url)
  return response.data
}

export const postRegistration = async (registration: TRegistration) => {
  await delay(1000)
  const response = await api.post('/registrations', registration)
  return response.data
}

export const patchRegistration = async (
  id: string,
  status: RegistrationStatus,
) => {
  await delay(1000)
  const response = await api.patch(`/registrations/${id}`, { status })
  return response.data
}

export const deleteRegistration = async (id: string) => {
  await delay(1000)
  const response = await api.delete(`/registrations/${id}`)
  return response.data
}
