import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { describe, expect, it } from 'vitest'
import { CreateUserService } from '../users/create.service'
import { AuthLoginService } from './auth-login.service'

describe('Auth login', () => {
  it('should be able to login', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '@Password123',
    })

    const authLoginService = new AuthLoginService(usersRepository)

    const { user: authenticatedUser } = await authLoginService.execute({
      email: user.email,
      password: '@Password123',
    })

    expect(authenticatedUser.id).toEqual(user.id)
  })

  it('should not be able to login with invalid credentials', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '@Password123',
    })

    const authLoginService = new AuthLoginService(usersRepository)

    await expect(() =>
      authLoginService.execute({
        email: user.email,
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(Error)

    await expect(() =>
      authLoginService.execute({
        email: 'invalid-email',
        password: '@Password123',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
