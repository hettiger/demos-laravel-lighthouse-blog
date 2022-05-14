import { paginatorInfo } from './utilities';

describe('Utilities', () => {
  describe('paginatorInfo', () => {
    it('should return the correct paginator info', () => {
      const info = paginatorInfo({
        currentPage: 2,
        perPage: 10,
        total: 100,
      });

      expect(info).toEqual({
        pageIndex: 1,
        pageSize: 10,
        length: 100,
      });
    });

    it('falls back to 0 values', () => {
      const info = paginatorInfo(undefined);

      expect(info).toEqual({
        pageIndex: 0,
        pageSize: 0,
        length: 0,
      });
    });
  });
});
