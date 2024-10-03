import {
  GenerativeModel,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      this.configService.get<string>('gemini.apiKey'),
    );
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 1,
        topP: 0.95,
      },
      systemInstruction: {
        role: 'model',
        parts: [
          {
            text: ` 1 - You are a code reviewer and review a code with javascript
                    2 - Give me a feedback about the PR in link. This feedback should be in md format.
                    3 - Give me sugestions to improve the code. This sugestions should be in md format.`,
          },
        ],
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });
  }

  review = async (url: string): Promise<{ review: string }> => {
    try {
      const result = await this.model.generateContent(url);

      return { review: result.response.candidates[0].content.parts[0].text };
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate response!');
    }
  };
}
