import path = require("path");
import { Uri } from "vscode";
import * as xlsx from "xlsx";

export const funcs = {
  // xlsx转ts
  xlsxToTs: (document: Uri) => {
    const excelPath = path.resolve(__dirname, "../../src/locales/lang.xlsx");
    try {
      console.log("xlsx======>xlsxToTs", excelPath);
      (global as any).readFile = xlsx.readFile;
      (global as any).pathFile = document;
      (global as any).xlsx = xlsx;
      //   const workbook = readFile(document.path);
    } catch (err) {
      console.log(err, "xlsx======error");
    }
  },
};
