import { FastifyInstance } from 'fastify'
import { createUserController, findUserController } from '../controllers/users'
import { authLoginController } from '../controllers/auth'
import { verifyJwt } from '@/middlewares/verify-jwt'
import { verifyIsAdmin } from '@/middlewares/verify-is-admin'

export const routes = async (app: FastifyInstance) => {
  app.get('/', async (_, reply) => {
    return reply.send('👨‍💻 Welcome to Projects Hub!')
  })

  // user routes
  app.register(
    async (userRoutes) => {
      userRoutes.post('/', createUserController)
      userRoutes.get(
        '/:id',
        { onRequest: [verifyJwt, verifyIsAdmin] },
        findUserController,
      )
    },
    { prefix: 'users' },
  )

  // Auth routes
  app.register(async (authRoutes) => {
    authRoutes.post('/login', authLoginController)
  })
}
