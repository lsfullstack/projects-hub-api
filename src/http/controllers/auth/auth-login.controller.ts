import { InvalidCredentialsError } from '@/errors/invalid-credentials.error'
import { makeAuthLoginFactory } from '@/http/factories/auth/make-auth-login.factory'
import { authLoginSchema } from '@/http/validators/auth/auth-login.schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export const authLoginController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { email, password } = authLoginSchema.parse(request.body)

  try {
    const authLoginService = makeAuthLoginFactory()

    const { user } = await authLoginService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
