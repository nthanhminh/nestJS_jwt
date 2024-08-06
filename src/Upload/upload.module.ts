import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileData, FileDataSchema } from './schema/filedata.schema';

@Module({
  providers: [UploadService],
  imports: [
    MongooseModule.forFeature([
      { name: FileData.name, schema: FileDataSchema },
    ]),
    MulterModule.register({
      dest: 'src/uploads',
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
