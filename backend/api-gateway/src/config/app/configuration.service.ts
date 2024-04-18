import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): string {
    return this.configService.get<string>('app.port');
  }

  get secretKey(): string {
    return this.configService.get<string>('app.secretKey');
  }
}
