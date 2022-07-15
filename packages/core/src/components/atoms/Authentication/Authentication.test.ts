import { authorize } from './Authentication';

const MOCK_BEARER_TOKEN = 'Bearer 12345';
const MOCK_AUTH_RESPONSE = {
  data: {
    viewer: {
      login: 'elephantpenis',
    },
  },
};

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(MOCK_AUTH_RESPONSE),
})) as jest.Mock;

describe('Github Authentication', () => {
  it('Should authenticate the user and return the user', async () => {
    const response = await authorize(MOCK_BEARER_TOKEN);
    expect(response).toEqual(MOCK_AUTH_RESPONSE);
  });
});
