import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { Balance } from './balance';

@Module({
  controllers: [BalanceController],
  providers: [Balance]
})
export class BalanceModule {}
