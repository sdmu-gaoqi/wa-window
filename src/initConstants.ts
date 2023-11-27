import * as vscode from "vscode";

export const defaultXlsxPath = "src/locales/lang.xlsx";
export const defaultXlsxTransformPath = "src/locales";
export const defaultXlsxTransformLanauges = [
  "zh-CN",
  "zh-TW",
  "en-US",
  "ja-JP",
  "ko-KR",
];
export const defaultLang = "zh-CN";

/**
 * @description 获取vscode 插件配置 没有就用默认的
 * */
export const getInitConstants = () => {
  const xlsxPath =
    vscode.workspace.getConfiguration().get("xlsxPath") || defaultXlsxPath;
  const _xlsxTransformPath =
    vscode.workspace.getConfiguration().get("xlsxTransformPath") ||
    defaultXlsxTransformPath;
  const _xlsxTransformType =
    vscode.workspace.getConfiguration().get("xlsxTransformType") ||
    defaultXlsxTransformLanauges;

  return {
    xlsxPath: xlsxPath as string,
    xlsxTransformPath: _xlsxTransformPath as string,
    xlsxTransformType: _xlsxTransformType as string,
    defaultLang,
  };
};
