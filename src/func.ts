import path = require("path");
import * as vscode from "vscode";
import * as xlsx from "xlsx";
import * as fs from "fs";
import * as prettier from "prettier";
import { getInitConstants } from "./initConstants";

export const funcs = {
  // xlsx转ts
  xlsxToTs: async (document: vscode.Uri) => {
    try {
      //   const pathFile = await vscode.workspace.openTextDocument(document.fsPath);
      (global as any).xlsx = xlsx;
      (global as any).pathFile = document;
      vscode.window.showInformationMessage("文件转换中...");
      const { xlsxTransformPath, xlsxTransformType } = getInitConstants();
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
        const activeWork =
          vscode.workspace.getWorkspaceFolder(document)?.uri.path;

        const getLangTsPath = (key: string) => {
          const startWith = xlsxTransformPath.startsWith("/");
          const endWith = xlsxTransformPath.endsWith("/");
          const fidlesPath = startWith
            ? "xlsxTransformPath"
            : `/${xlsxTransformPath}`;
          return `${activeWork}${fidlesPath}${
            endWith ? "" : "/"
          }${key}.${xlsxTransformType}`;
        };

        const config = await prettier.resolveConfig("path/to/file", {
          useCache: false,
        });
        // 将Object转成ts
        Object.keys(l10n).forEach((key: string) => {
          const str = `export default ${JSON.stringify(l10n[key], null, 2)}\n`;
          const filePath = getLangTsPath(key);
          prettier
            .format(str, { ...config, semi: false, filepath: filePath })
            .then((res: string) => {
              fs.writeFileSync(filePath, res, "utf8");
            });
        });
        vscode.window.showInformationMessage("文件转换完成");
      }
    } catch (err) {
      vscode.window.showErrorMessage("文件转换失败", JSON.stringify(err));
      console.log(err, "xlsx======error");
    }
  },
};
