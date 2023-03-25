import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modules } from './modules';

@Module({
  imports: [...Modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
