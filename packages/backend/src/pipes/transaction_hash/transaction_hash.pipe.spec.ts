import { TransactionHashPipe } from './transaction_hash.pipe';

describe('TransactionHashPipe', () => {
  let pipe: TransactionHashPipe;

  beforeEach(() => {
    pipe = new TransactionHashPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return the hash if it is valid', () => {
    const validHash =
      '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

    expect(pipe.transform(validHash)).toBe(validHash);
  });

  it('should throw an error for invalid hashes', () => {
    // too short
    expect(() => pipe.transform('0x123')).toThrow();

    // missing 0x
    expect(() => pipe.transform('aaaaaaaaaaaaaaaa')).toThrow();

    // wrong length
    expect(() =>
      pipe.transform('0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    ).toThrow();

    // non-hex characters
    expect(() =>
      pipe.transform(
        '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      )
    ).toThrow();

    // null or empty
    expect(() => pipe.transform('')).toThrow();
    expect(() => pipe.transform(null as any)).toThrow();
  });
});
