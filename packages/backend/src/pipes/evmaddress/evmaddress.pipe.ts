import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EvmaddressPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Address must be a string');
    }

    const trimmed = value.trim();
    const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

    if (!ETH_ADDRESS_REGEX.test(trimmed)) {
      throw new BadRequestException(`Invalid EVM address ${value}`);
    }
    
    return trimmed.toLowerCase();
  }
}
