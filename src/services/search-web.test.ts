import { searchWeb } from './search-web';

describe('searchWeb', () => {
  it('should return mock search results for a given query', async () => {
    const query = 'test query';
    const results = await searchWeb(query);
    expect(results).toBe(`Showing results for "${query}":\n\n- Result 1...\n- Result 2...\n- Result 3...`);
  });
});
