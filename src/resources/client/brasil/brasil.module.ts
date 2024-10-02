import { Module } from '@nestjs/common';
import { brasilProviders } from '../../../config/providers/brasil.provider';

@Module({
  providers: brasilProviders,
})
export class BrasilModule {}
