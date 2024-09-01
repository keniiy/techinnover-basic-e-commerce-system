import { DynamicModule } from '@nestjs/common';
import { ClsModule, ClsModuleOptions } from 'nestjs-cls';

export const ClsConfig: ClsModuleOptions = {
  global: true,
  middleware: { mount: true },
  interceptor: { mount: true },
  guard: { mount: true },
};

export const getClsModule = (): DynamicModule => ClsModule.forRoot(ClsConfig);
