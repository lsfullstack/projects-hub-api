import { InvalidCredentialsError } from '@/errors/invalid-credentials.error'
import { UsersRepository } from '@/interfaces/repositories/users-repository.interface'
import { AuthLoginServiceRequest } from '@/interfaces/routes/auth-route.interface'
import { compare } from 'bcrypt'

export class AuthLoginService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, password }: AuthLoginServiceRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
