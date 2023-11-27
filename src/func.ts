import path = require("path");
import * as vscode from "vscode";
import * as xlsx from "xlsx";
import * as fs from "fs";
import { getInitConstants } from "./initConstants";

export const funcs = {
  // xlsx转ts
  xlsxToTs: (document: vscode.Uri) => {
    try {
      //   const pathFile = await vscode.workspace.openTextDocument(document.fsPath);
      (global as any).xlsx = xlsx;
      (global as any).pathFile = document;
      const { xlsxTransformPath } = getInitConstants();
      const data = fs.readFileSync(document.fsPath).buffer;
      const file = xlsx.read(data);
      const l10n: Record<string, Record<string, string>> = {};
      for (const sheetName of file.SheetNames) {
        const sheetData: any = xlsx.utils.sheet_to_json(file.Sheets[sheetName]);
        const fields = Object.keys(sheetData[0]);

        // 获取到xlsx里的数据转成Object格式
        sheetData.forEach((word: Record<string, string>) => {
          // 0 是 key
          for (let index = 1; index < fields.length; index++) {
            const field = fields[index];
            if (!l10n[field]) {
              l10n[field] = {};
            }
            l10n[field][word.key] = String(word[field || "zh-CN"]) || "";
          }
        });
        console.log(document, "document");
        // 将Object转成ts
        // Object.keys(l10n).forEach((key: string) => {
        //   const str = `export default ${JSON.stringify(l10n[key], null, 2)}\n`
        //   const writePath = getLangTsPath(key)
        //   prettier.format(str, { ...config, semi: false, filepath: writePath }).then((res: string) => {
        //     fs.writeFileSync(writePath, res, 'utf8')
        //   })
        // })
      }
    } catch (err) {
      console.log(err, "xlsx======error");
    }
  },
};
