import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async findByEmail(email: string) {
  return this.userRepository.findOne({ where: { email } });
}

   async create(dto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const exists = await this.findByEmail(dto.email);
    if (exists) {
      throw new Error('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create a new user
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    // Save the user to the database
    return this.userRepository.save(user);
  }

  async updateProfile(userId: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.name = dto.name ?? user.name;
    user.address = dto.address ?? user.address;
    user.image = dto.image ?? user.image;
    user.dob = dto.dob ? new Date(dto.dob) : user.dob;

    return this.userRepository.save(user);
  }


  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
