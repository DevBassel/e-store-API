import { Global, Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blacklist } from './entities/blacklist.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Blacklist])],
  providers: [BlacklistService],
  exports: [BlacklistService, BlacklistModule],
})
export class BlacklistModule {}
