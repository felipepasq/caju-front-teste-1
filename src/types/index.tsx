export enum RegistrationStatus {
  REPROVED = 'REPROVED',
  REVIEW = 'REVIEW',
  APPROVED = 'APPROVED',
}

export type TRegistration = {
  admissionDate: string
  cpf: string
  email: string
  employeeName: string
  id: string
  status: RegistrationStatus
}
