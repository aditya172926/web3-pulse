import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [HttpModule, CacheModule.register()],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule {}
