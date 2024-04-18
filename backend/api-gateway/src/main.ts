import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  const PORT = appConfig.port || 8080;

  await app.listen(PORT, () =>
    console.log(`listening on port ${appConfig.port}`),
  );
}
bootstrap();
