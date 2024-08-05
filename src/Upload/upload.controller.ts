import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
// import * as XLSX from 'xlsx';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    // const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    // const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // const data = XLSX.utils.sheet_to_json(worksheet);
    // console.log(workbook, data);
    // return 'Testing';
    // const filePath = join(__dirname, '../src', 'uploads', file.originalname);
    // const writeStream = createWriteStream(filePath);

    // writeStream.write(file.buffer);
    // writeStream.end();

    // return { message: 'File uploaded successfully', filePath };
    // if (!file || !file.buffer) {
    //   throw new Error('File or file buffer is not defined');
    // }

    // const filePath = join(__dirname, '../src', 'uploads', file.originalname);
    // const writeStream = createWriteStream(filePath);

    // // Writing the buffer to the stream
    // writeStream.write(file.buffer);
    // writeStream.end();
    console.log(file);
    return { message: 'File uploaded successfully' };
  }
}
