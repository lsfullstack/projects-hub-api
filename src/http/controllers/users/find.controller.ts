import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { makeFindUserFactory } from '@/http/factories/users/make-find-user.factory'
import { FastifyReply, FastifyRequest } from 'fastify'

export const findUserController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string }

  try {
    const findUserService = makeFindUserFactory()

    const user = await findUserService.execute(id)

    return reply.status(200).send({ user })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
