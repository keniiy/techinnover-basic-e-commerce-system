import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OnboardingServiceVersion1 } from '../services/onboarding.service1';
import { CreateOnboardingDto } from '../dto/version1/create-onboarding.dto';
import { UpdateOnboardingDto } from '../dto/version1/update-onboarding.dto';

@ApiTags('Onboarding V1')
@Controller({
  path: 'onboarding',
  version: '1',
})
export class OnboardingControllerVersion1 {
  constructor(
    private readonly onboardingServiceVersion1: OnboardingServiceVersion1,
  ) {}

  @Post()
  create(@Body() createOnboardingDto: CreateOnboardingDto) {
    return this.onboardingServiceVersion1.create(createOnboardingDto);
  }

  @Get()
  findAll() {
    return this.onboardingServiceVersion1.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onboardingServiceVersion1.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOnboardingDto: UpdateOnboardingDto,
  ) {
    return this.onboardingServiceVersion1.update(+id, updateOnboardingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onboardingServiceVersion1.remove(+id);
  }
}
