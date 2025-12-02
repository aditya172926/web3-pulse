import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransactionHashPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Transaction hash must be a string');
    }

    const trimmed = value.trim();

    const TX_HASH_REGEX = /^0x[a-fA-F0-9]{64}$/;

    if (!TX_HASH_REGEX.test(trimmed)) {
      throw new BadRequestException(`Invalid Transaction hash ${value}`);
    }

    return trimmed.toLowerCase();
  }
}
