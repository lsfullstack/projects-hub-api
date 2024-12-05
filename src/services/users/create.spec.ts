import { expect, describe, it } from 'vitest'
import { CreateUserService } from './create.service'
import { EmailAlreadyExistsError } from '@/errors/email-already-exists.error'
import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'

describe('Create user', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '@Password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new user with an existing email address', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const email = 'johndoe@mail.com'

    await createUserService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      createUserService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })

  it('should hashed user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
