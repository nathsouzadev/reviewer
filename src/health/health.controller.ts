import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
} from '@nestjs/terminus';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  @ApiOkResponse({ description: 'Service information' })
  @Get()
  @HealthCheck()
  async health() {
    return {
      social: { status: 'up' },
    }
  }
}
