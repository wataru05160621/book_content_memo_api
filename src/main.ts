import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Vercel環境での設定
  if (process.env.VERCEL) {
    app.enableCors();
  } else {
    // CORSの設定を追加
    app.enableCors({
      origin: true, // 開発環境では全てのオリジンを許可
      credentials: true,
    });
  }

  // バリデーションパイプの設定
  app.useGlobalPipes(new ValidationPipe());

  // Swagger設定
  const config = new DocumentBuilder()
    .setTitle('Book Content Memo API')
    .setDescription('書籍内容メモアプリケーションのAPI仕様書')
    .setVersion('1.0')
    .addTag('認証')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  // 起動確認のログを追加
  console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
