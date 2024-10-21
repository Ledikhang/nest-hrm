import { Module } from '@nestjs/common';
import { ListErrService } from './list-err.service';
import { ListErrController } from './list-err.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ListErr from 'src/entities/list-err.entity';
import Image from 'src/entities/img-err.entity'; // Nhập Image entity
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ListErr, Image]),
    CloudinaryModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }),
    }),
  ],
  controllers: [ListErrController],
  providers: [ListErrService],
})
export class ListErrModule {}
