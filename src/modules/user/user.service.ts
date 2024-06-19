import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserSerializer } from './entities/user.entity';
import { Repository } from 'typeorm';
import { paginate } from 'src/utils/paginate';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(userDate: CreateUserDto) {
    const checkUser = await this.userRepo.findOneBy({ email: userDate.email });

    if (checkUser) throw new ConflictException('user is exist!');

    // hash password
    const hashPassword = await hash(userDate.password, await genSalt());

    await this.userRepo.save({ ...userDate, password: hashPassword });

    return { msg: 'user has been created ^_^' };
  }

  // async updateUser(user: any) {}

  async findOneUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found O_o');

    return new UserSerializer(user);
  }

  findWithEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    const query = this.userRepo.createQueryBuilder('user');
    const { data, ...metadata } = await paginate<User>(query, page, limit);

    return { data: data.map((user) => new UserSerializer(user)), metadata };
  }

  deleteUser(userId: number) {
    return { msg: `will delete this user ${userId}` };
  }
}
