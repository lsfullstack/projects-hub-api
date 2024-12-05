import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { UnauthorizedError } from '@/errors/unauthorized.error'
import { makeFindUserFactory } from '@/http/factories/users/make-find-user.factory'
import { FastifyReply, FastifyRequest } from 'fastify'

export const verifyIsAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { sub: userId } = request.user

    const findUserService = makeFindUserFactory()

    const { user } = await findUserService.execute(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    const isAdmin = user.is_admin

    if (!isAdmin) {
      throw new UnauthorizedError()
    }
  } catch (error) {
    return reply.status(403).send({ message: 'Unauthorized' })
  }
}
