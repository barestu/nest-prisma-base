import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptProvider {
  async generateSalt(rounds: number) {
    return genSalt(rounds);
  }

  async hash(password: string, saltRounds: number) {
    const salt = await this.generateSalt(saltRounds);
    return hash(password, salt);
  }

  async compare(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }
}
