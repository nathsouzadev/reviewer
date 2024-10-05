import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RevivewService } from './service/revivew.service';
import { RevivewDto } from './dto/revivew.dto';

@Controller()
export class RevivewController {
  constructor(private readonly revivewService: RevivewService) {}

  @Post()
  review(@Body(new ValidationPipe()) reviewDto: RevivewDto) {
    return this.revivewService.review(reviewDto);
  }
}
