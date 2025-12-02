import { EvmaddressPipe } from './evmaddress.pipe';

describe('EvmaddressPipe', () => {
  let pipe: EvmaddressPipe;

  beforeEach(() => {
    pipe = new EvmaddressPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return the address if it is valid', () => {
    const addr = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';

    expect(pipe.transform(addr)).toBe(addr.toLowerCase());
  });

  it('should throw an error for invalid address', () => {
    expect(() => pipe.transform('not-an-address')).toThrow();
    expect(() => pipe.transform('0x123')).toThrow();
    expect(() => pipe.transform('')).toThrow();
    expect(() => pipe.transform(null as any)).toThrow();
  });
});
