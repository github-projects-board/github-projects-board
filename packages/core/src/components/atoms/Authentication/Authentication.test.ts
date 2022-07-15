import { authorize } from './Authentication';

const MOCK_BEARER_TOKEN = '12345';
const MOCK_RESPONSE = {
  data: {
    views: {
      login: 'elephantpenis',
    },
  },
};

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(MOCK_RESPONSE),
})) as jest.Mock;

describe('Authentication', () => {
  it('should be defined', () => {
    expect(authorize).toBeDefined();
  });
  it('should return a user after authentication', async () => {
    const response = await authorize(MOCK_BEARER_TOKEN);
    expect(response).toEqual(MOCK_RESPONSE);
  });
  it('should throw an error if the token is not provided', async () => {
    try {
      // @ts-ignore
      const response = await authorize();
      expect(response).toBeUndefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
