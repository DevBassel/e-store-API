import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { EntityManager } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class SeedingService {
  constructor(@InjectEntityManager() private readonly em: EntityManager) {}

  async seed(count: number) {
    for (let index = 0; index < count; index++) {
      await this.genUser();
      const categoryId = (await this.genCategory()).id;
      await this.genPrduct(categoryId);
    }

    return {
      msg: `sedding is done ${count} item is added`,
    };
  }

  async genUser() {
    const password = await hash('password123', await genSalt());
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      password,
    };

    await this.em.save(User, userData);
  }

  async genCategory() {
    const cat = {
      name: faker.commerce.department(),
    };

    const categoryFind = await this.em.findOneBy(Category, {
      name: cat.name,
    });

    if (categoryFind) {
      return categoryFind;
    } else {
      return this.em.save(Category, cat);
    }
  }

  async genPrduct(catId: number) {
    const productData = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: +faker.commerce.price({ min: 100, max: 4000 }),
      img: faker.image.url({ width: 600, height: 600 }),
      categoryId: catId,
      stock: faker.number.int({ min: 1, max: 500 }),
    };
    await this.em.save(Product, productData);
  }
}
