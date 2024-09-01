import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingControllerVersion1 } from './onboarding.controller1';
import { OnboardingServiceVersion1 } from '../services/onboarding.service1';

describe('OnboardingControllerVersion1', () => {
  let controller: OnboardingControllerVersion1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingControllerVersion1],
      providers: [OnboardingServiceVersion1],
    }).compile();

    controller = module.get<OnboardingControllerVersion1>(
      OnboardingControllerVersion1,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
