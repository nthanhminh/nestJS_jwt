import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileData } from './schema/filedata.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateNewEmployee } from './dto/createNewEmployee.dto';
import * as ExcelJS from 'exceljs';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(FileData.name) private fileDataModel: Model<UserDocument>,
  ) {}

  async createNewData(data: CreateNewEmployee[]) {
    try {
      await this.fileDataModel.insertMany(data);
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      throw new Error('Failed to insert data');
    }
  }

  async createNewData1(data: CreateNewEmployee) {
    try {
      await this.fileDataModel.create(data);
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.error('Validation Error:', error.message);
        return;
      } else if (error.code === 11000) {
        console.error('Duplicate Key Error:', error.message);
        return;
      } else {
        console.error('Error inserting data:', error);
      }
    }
  }

  async handleFileData(filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const rows: any[] = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      rows.push(row.values);
      console.log(rowNumber);
    });

    const dataSheet = rows.map((row, index) => {
      const data: CreateNewEmployee = {
        EEID: row[1],

        FullName: row[2],

        JobTitle: row[3],

        Department: row[4],

        BusinessUnit: row[5],

        Gender: row[6],

        Ethnicity: row[7],

        Age: row[8],

        HireDate: row[9],

        AnnualSalary: row[10],

        Bonus: row[11],

        Country: row[12],

        City: row[13],

        ExitDate: row[14],

        email: row[15].result,
      };
      this.createNewData1(data);
      if (index === 1) {
        console.log(data);
      }
      return;
    });

    try {
      Promise.all(dataSheet);
    } catch (error) {
      console.log(error);
    }
    // console.log(dataSheet);
    console.log('File read successfully');
  }
}
