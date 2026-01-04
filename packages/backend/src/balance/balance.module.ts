import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpClientModule } from 'src/http-client/http-client.module';

@Module({
  imports: [HttpClientModule, CacheModule.register()],
  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
