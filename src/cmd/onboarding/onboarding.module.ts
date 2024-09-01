import { Module } from '@nestjs/common';
import { OnboardingControllerVersion1 } from './controllers';
import { OnboardingServiceVersion1 } from './services';

@Module({
  controllers: [OnboardingControllerVersion1],
  providers: [OnboardingServiceVersion1],
})
export class OnboardingModule {}
