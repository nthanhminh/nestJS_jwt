import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [],
  imports: [
    MulterModule.register({
      dest: 'src/uploads',
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
