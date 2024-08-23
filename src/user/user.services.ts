import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { hashPassword } from 'src/utils/utils';
import { createUserDto, updateUserDto } from './dto/createUser.dto';

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

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
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

  async update(id: number, data: updateUserDto) {
    const { email, username } = data;
    return await this.userRepository.update(id, { email, username });
  }
}
