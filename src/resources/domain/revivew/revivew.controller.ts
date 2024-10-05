import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RevivewService } from './service/revivew.service';
import { RevivewDto } from './dto/revivew.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller()
export class RevivewController {
  constructor(private readonly revivewService: RevivewService) {}

  @ApiCreatedResponse({
    description: 'Get code review from Gemini',
    schema: {
      type: 'object',
      properties: {
        review: { type: 'string' },
      },
      example: {
        review: 'Code review from Gemini',
      },
    },
  })
  @Post()
  review(@Body(new ValidationPipe()) reviewDto: RevivewDto) {
    return this.revivewService.review(reviewDto);
  }
}
