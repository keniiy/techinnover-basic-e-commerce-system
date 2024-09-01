import { Injectable } from '@nestjs/common';
import { CreateOnboardingDto } from '../dto/version1';
import { UpdateOnboardingDto } from '../dto/version1';

@Injectable()
export class OnboardingServiceVersion1 {
  create(createOnboardingDto: CreateOnboardingDto) {
    return 'This action adds a new onboarding';
  }

  findAll() {
    return `This action returns all onboarding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} onboarding`;
  }

  update(id: number, updateOnboardingDto: UpdateOnboardingDto) {
    return `This action updates a #${id} onboarding`;
  }

  remove(id: number) {
    return `This action removes a #${id} onboarding`;
  }
}
