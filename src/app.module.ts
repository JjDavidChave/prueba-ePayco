import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {config} from './config/database/typeorm.config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProofControl } from './modules/proof_contol.module';
import { SoapModule } from './soap/soap.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 50000,
        limit: 20,
      },
    ]),
    TypeOrmModule.forRootAsync({
      // imports: [],
      // inject: [],
      useFactory: () => {
        // return { ...config, autoLoadEntities: true };
        return { ...config };
      },
    }),
    ProofControl,
    SoapModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}