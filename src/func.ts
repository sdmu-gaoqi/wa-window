import path = require("path");
import * as vscode from "vscode";
import * as xlsx from "xlsx";

export const funcs = {
  // xlsx转ts
  xlsxToTs: (document: vscode.Uri) => {
    try {
      console.log("xlsx======>xlsxToTs");
      //   const pathFile = await vscode.workspace.openTextDocument(document.fsPath);
      (global as any).xlsx = xlsx;
      (global as any).pathFile = document;
      const file = xlsx.read(document.path);
      console.log(file, "xlsx======data");
      for (const sheetName of file.SheetNames) {
        const data = xlsx.utils.sheet_to_json(file.Sheets[sheetName]);
      }
    } catch (err) {
      console.log(err, "xlsx======error");
    }
  },
};
