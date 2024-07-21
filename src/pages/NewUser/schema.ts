import { z } from 'zod'

export const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos dois caracteres.' })
    .refine((nome) => / /.test(nome), {
      message: 'Você deve colocar seu nome completo',
    })
    .refine((nome) => /^[^\d]/.test(nome), {
      message: 'Nome não pode começar com um número.',
    })
    .refine(
      (nome) => {
        const parts = nome.split(' ')
        return parts.length > 1 && parts[1].length > 1
      },
      {
        message: 'Você deve colocar seu nome completo.',
      },
    ),
  email: z
    .string()
    .min(1, { message: 'Esse campo é obrigatório' })
    .email('Esse email não é válido'),
  cpf: z.string().refine((cpf: string) => {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    const cpfDigits = cpf.split('').map((el) => +el)
    const rest = (count: number): number => {
      return (
        ((cpfDigits
          .slice(0, count - 12)
          .reduce((soma, el, index) => soma + el * (count - index), 0) *
          10) %
          11) %
        10
      )
    }
    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10]
  }, 'Digite um CPF válido.'),
  date: z.preprocess(
    (arg) => {
      if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
    },
    z.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === 'invalid_date' ? 'Essa data é inválida' : defaultError,
      }),
    }),
  ),
})

export type FormData = z.infer<typeof schema>
