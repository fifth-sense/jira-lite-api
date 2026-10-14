import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthModule } from './health/health.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), //loads env
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: true,
        autoLoadEntities: true,
        synchronize: false // i ll use migration for schema changes, never auto-sync
      }),
      
    }),
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
