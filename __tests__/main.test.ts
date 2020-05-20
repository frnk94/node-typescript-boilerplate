import { getTokenFromSession } from '../src/token.helper';

jest.mock('../src/token.helper', () => {
  const mockModule = {
    getTokenFromSession: jest.fn(),
    getStreamingToken: jest.fn(),
  };
  return mockModule;
});

describe('getTokenFromSession', () => {
  beforeEach(() => {
    jest.mock('../src/token.helper', () => {
      const actualModule = jest.requireActual('../src/token.helper');
      return { ...actualModule }; // can assert against this mock
    });
    jest.resetAllMocks();
  });

  it("should throw an error if the request doesn't contain the session", () => {
    console.log(getTokenFromSession);
    expect(() => getTokenFromSession({} as any)).toThrow(
      new Error('Express session not initialize'),
    );
  });

  it('should return sandbox token', () => {
    expect(getTokenFromSession({ session: {} } as any, true)).toEqual(
      'sandbox_token',
    );
  });

  it('should return token', () => {
    expect(getTokenFromSession({ session: {} } as any)).toEqual('token');
  });
});

// describe('getStreamingToken', () => {
//   // eslint-disable-next-line jest/expect-expect
//   it('should call getTokenFromSession with sandbox if not prd', () => {
//     getStreamingToken({} as any);
//     expect(getTokenFromSession).toBeCalledWith({}, true);
//   });
// });
