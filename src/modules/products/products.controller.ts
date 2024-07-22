import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from '../auth/enums/role.enum';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiQueryArray } from 'src/decorator/queryArray.decorator';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        stock: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
        categoryId: {
          type: 'number',
        },
        img: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, img);
  }

  @Get()
  @ApiQueryArray([
    {
      name: 'page',
      required: true,
    },
    {
      name: 'limit',
      required: false,
    },
    {
      name: 'category',
      required: false,
    },
    {
      name: 'min',
      required: false,
    },
    {
      name: 'max',
      required: false,
    },
    {
      name: 's',
      required: false,
      description: 'search',
    },
  ])
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('category') category: string,
    @Query('min', new DefaultValuePipe(0)) min: number,
    @Query('max', new DefaultValuePipe(1_000_000)) max: number,
    @Query('s') s: string,
  ) {
    return this.productsService.findAll(page, limit, {
      category,
      max,
      min,
      s,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
