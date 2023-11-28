export {};

declare module "xlsx-cli";
declare global {
  interface Window {
    vscode: {
      postMessage: (message: any) => void;
      onDidReceiveMessage: (message: any) => void;
    };
    $webview: {
      baiduAppid: string;
      baiduAppKey: string;
    };
  }
}
