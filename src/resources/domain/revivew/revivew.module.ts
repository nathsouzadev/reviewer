import { Module } from '@nestjs/common';
import { RevivewService } from './service/revivew.service';
import { RevivewController } from './revivew.controller';
import { GeminiService } from '../../../resources/client/gemini/gemini.service';

@Module({
  controllers: [RevivewController],
  providers: [RevivewService, GeminiService],
})
export class RevivewModule {}
