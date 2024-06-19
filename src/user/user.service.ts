import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { paginate } from 'src/utils/paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(userDate: CreateUserDto) {
    const checkUser = await this.userRepo.findOneBy({ email: userDate.email });

    if (checkUser) throw new ConflictException('user is exist!');

    return this.userRepo.save(userDate);
  }

  async findOneUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found O_o');

    return user;
  }

  getAllUsers() {
    const query = this.userRepo.createQueryBuilder('user');
    return paginate(query, 1, 10);
  }
}
