import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsModule } from './transactions/transactions.module';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TransactionsModule,
    HttpModule,
    CacheModule.register()
  ],
  controllers: [AppController, TransactionsController],
  providers: [AppService, TransactionsService],
})
export class AppModule {}