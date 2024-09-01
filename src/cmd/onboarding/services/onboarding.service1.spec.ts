import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingServiceVersion1 } from './onboarding.service1';

describe('OnboardingService', () => {
  let service: OnboardingServiceVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnboardingServiceVersion1],
    }).compile();

    service = module.get<OnboardingServiceVersion1>(OnboardingServiceVersion1);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
