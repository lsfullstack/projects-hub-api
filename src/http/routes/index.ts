import { FastifyInstance } from 'fastify'
import { createUserController } from '../controllers/users'
import { authLoginController } from '../controllers/auth'

export const routes = async (app: FastifyInstance) => {
  app.get('/', async (_, reply) => {
    return reply.send('👨‍💻 Welcome to Projects Hub!')
  })

  // user routes
  app.register(
    async (userRoutes) => {
      userRoutes.post('/', createUserController)
    },
    { prefix: 'users' },
  )

  // Auth routes
  app.register(async (authRoutes) => {
    authRoutes.post('/login', authLoginController)
  })
}
