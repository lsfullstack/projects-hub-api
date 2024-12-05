import { EmailAlreadyExistsError } from '@/errors/email-already-exists.error'
import { makeCreateUserFactory } from '@/http/factories/users/make-create.factory'
import { createUserSchema } from '@/http/validators/users/create.schema'

import { FastifyReply, FastifyRequest } from 'fastify'

export const createUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { name, email, password } = createUserSchema.parse(request.body)

  try {
    const createUserService = makeCreateUserFactory()

    await createUserService.execute({ name, email, password })

    return reply.status(201).send({ message: 'User created successfully' })
  } catch (error: unknown) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
