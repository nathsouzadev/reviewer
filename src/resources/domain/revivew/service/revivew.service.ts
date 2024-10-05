import { Injectable } from '@nestjs/common';
import { RevivewDto } from '../dto/revivew.dto';
import { GeminiService } from '../../../../resources/client/gemini/gemini.service';

@Injectable()
export class RevivewService {
  constructor(private geminiService: GeminiService) {}

  review = async (reviewDto: RevivewDto): Promise<{ review: string }> =>
    this.geminiService.review(reviewDto.url);
}
