import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Module({
  providers: [GeminiService],
})
export class GeminiModule {}
