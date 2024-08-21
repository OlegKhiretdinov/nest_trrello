import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { createUserDto } from './dto/createUser.dto';
import { hashPassword } from 'src/utils/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async create(data: createUserDto) {
    const created_at = new Date().toISOString();
    const password = await hashPassword(data.password);
    const newUser = this.userRepository.create({
      ...data,
      created_at,
      password,
    });
    return await this.userRepository.save(newUser);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  async update(id: number, data: createUserDto) {
    return await this.userRepository.update(id, data);
  }
}
