import { Injectable } from '@nestjs/common';
import { RevivewDto } from '../dto/revivew.dto';
import { GeminiService } from '../../../../resources/client/gemini/gemini.service';
import { UsersService } from '../../users/service/users.service';

@Injectable()
export class RevivewService {
  constructor(
    private geminiService: GeminiService,
    private userService: UsersService,
  ) {}

  review = async (reviewDto: RevivewDto): Promise<{ review: string }> => {
    const user = await this.userService.getByEmail(reviewDto.email);
    return this.geminiService.review(reviewDto.url);
  };
}
