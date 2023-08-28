import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { getRequestFromContext } from '../src/lib/utilities';

describe('getRequestFromContext', () => {
  let mockExecutionContext: ExecutionContext;
  let mockHttpArgumentsHost: HttpArgumentsHost;
  let mockGqlExecutionContext: typeof GqlExecutionContext;

  beforeEach(async () => {
    mockHttpArgumentsHost = {
      getRequest: jest.fn(),
      getResponse: jest.fn(),
      getNext: jest.fn(),
    };

    mockExecutionContext = {
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue(mockHttpArgumentsHost),
      getType: jest.fn(),
    } as any;

    mockGqlExecutionContext = {
      create: jest.fn().mockReturnValue({
        getContext: jest.fn().mockReturnValue({ req: {} }),
      }),
    } as any;

    jest
      .spyOn(GqlExecutionContext, 'create')
      .mockImplementation(mockGqlExecutionContext.create);
  });

  it('should retrieve the request from HTTP context', () => {
    (mockHttpArgumentsHost.getRequest as jest.Mock).mockReturnValueOnce({
      dummy: 'request',
    });

    const result = getRequestFromContext(mockExecutionContext);
    expect(result).toEqual({ dummy: 'request' });
  });

  it('should retrieve the request from GraphQL context if not found in HTTP context', () => {
    (mockHttpArgumentsHost.getRequest as jest.Mock).mockReturnValueOnce(
      undefined,
    );

    const result = getRequestFromContext(mockExecutionContext);
    expect(GqlExecutionContext.create).toHaveBeenCalledWith(
      mockExecutionContext,
    );
    expect(result).toEqual({});
  });

  it('should return undefined if request not found in both HTTP and GraphQL context', () => {
    (mockHttpArgumentsHost.getRequest as jest.Mock).mockReturnValueOnce(
      undefined,
    );
    (mockGqlExecutionContext.create as jest.Mock).mockReturnValueOnce({
      getContext: jest.fn().mockReturnValue({}),
    });

    const result = getRequestFromContext(mockExecutionContext);
    expect(result).toBeUndefined();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
