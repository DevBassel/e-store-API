import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favourite } from './entities/favourite.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/dto/jwt-payload';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Favourite) private favRepo: Repository<Favourite>,
  ) {}

  async create(createFavouriteDto: CreateFavouriteDto, user: JwtPayload) {
    const fav = await this.favRepo.findOneBy({
      productId: createFavouriteDto.productId,
    });

    if (fav) throw new ConflictException('this favourite alrady exist O_o');
    return this.favRepo.save({ ...createFavouriteDto, userId: user.id });
  }

  findAll(user: JwtPayload) {
    return this.favRepo.findBy({ userId: user.id });
  }

  async findOne(id: number) {
    const fav = await this.favRepo.findOne({
      where: { id },
      relations: {
        product: { category: true },
      },
    });

    if (!fav) throw new NotFoundException();

    return fav;
  }

  async remove(id: number, user: JwtPayload) {
    const fav = await this.findOne(id);

    if (fav.userId !== user.id) throw new UnauthorizedException();

    return this.favRepo.delete({ id });
  }
}
