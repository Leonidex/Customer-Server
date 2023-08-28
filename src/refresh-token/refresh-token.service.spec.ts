import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenService } from './refresh-token.service';
import * as moment from 'moment';
import { RefreshTokenEntity } from 'lib/entities/refresh-token.entity';

describe('RefreshTokenService', () => {
  let service: RefreshTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokenService],
    }).compile();

    service = module.get<RefreshTokenService>(RefreshTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('refreshTokenIsValid', () => {
  let service: RefreshTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokenService],
    }).compile();

    service = module.get<RefreshTokenService>(RefreshTokenService);
  });

  it('should return false if refreshTokenEntity is null or undefined', async () => {
    expect(await service.refreshTokenIsValid(null)).toBeFalsy();
    expect(await service.refreshTokenIsValid(undefined)).toBeFalsy();
  });

  it('should return false if expirationDate is before the current date', async () => {
    const refreshTokenEntity = {
      expirationDate: moment().subtract(1, 'day').toDate(),
    } as RefreshTokenEntity;

    expect(await service.refreshTokenIsValid(refreshTokenEntity)).toBeFalsy();
  });

  it('should return true if expirationDate is after the current date', async () => {
    const refreshTokenEntity = {
      expirationDate: moment().add(1, 'day').toDate(),
    } as RefreshTokenEntity;

    expect(await service.refreshTokenIsValid(refreshTokenEntity)).toBeTruthy();
  });
});
