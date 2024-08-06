import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { createReadStream } from 'fs';
// import { join } from 'path';
// import { createWriteStream } from 'fs';
import { join } from 'path';
// import * as XLSX from 'xlsx';
// import * as ExcelJS from 'exceljs';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const filePath = join(__dirname, '..', file.path);
    await this.uploadService.handleFileData(filePath);
    return {
      message: 'File uploaded and streamed successfully',
      file,
    };
  }
}
