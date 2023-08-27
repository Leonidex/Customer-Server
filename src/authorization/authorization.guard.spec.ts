import { AuthorizationGuard } from './authorization.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorizationGuard,
        Reflector, // this will mock Reflector for you
      ],
    }).compile();

    guard = module.get<AuthorizationGuard>(AuthorizationGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
