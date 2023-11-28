import { WebviewView, WebviewViewProvider } from "vscode";
import * as vscode from "vscode";
import path from "path";
import bridge from "../utils/bridge";
import { PostmessageType } from "../constants/content";

type ChatWebviewConfig = {
  name: string;
  context: vscode.ExtensionContext;
  packName: string;
  receiveMessage?: Partial<typeof bridge>;
};

export class ChatWebview implements WebviewViewProvider {
  public webview: WebviewView | null = null;
  tsx: (webview: WebviewView) => void = () => {};
  isProduction: boolean = false;
  config: ChatWebviewConfig;

  constructor(c: ChatWebviewConfig) {
    const { context } = c;
    this.config = c;
    this.isProduction =
      context.extensionMode === vscode.ExtensionMode.Production;
  }

  resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
    const { context, receiveMessage, packName } = this.config;
    this.webview = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
    };

    // 监听web端传来的消息
    this.webview.webview.onDidReceiveMessage((message: any) => {
      const fn = receiveMessage?.[message.type as PostmessageType];
      if (fn) {
        fn(message.data);
      }
    });

    // webview 展示的内容本身就是嵌套在一个iframe中，因此在此html中再嵌套一个iframe时，需要传递两次postMessage

    let srcUrl;
    if (this.isProduction) {
      const filePath = vscode.Uri.file(
        path.join(context.extensionPath, "dist", `static/js/${packName}.js`)
      );
      srcUrl = webviewView.webview.asWebviewUri(filePath).toString();
    } else {
      srcUrl = `http://localhost:3000/static/js/${packName}.js`;
    }
    webviewView.webview.html = this.getWebviewContent(srcUrl);
  }

  getWebviewContent(srcUri: string) {
    const baiduAppid = vscode.workspace
      .getConfiguration()
      .get("windowBaiduAppid");
    const baiduAppKey = vscode.workspace
      .getConfiguration()
      .get("windowBaiduKey");

    return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>webview-react</title>
      <style>
        body {
          overflow-x: hidden;
          word-break: break-all;
        }
      </style>
      <script defer="defer" src="${srcUri}"></script>
      <script>
          const vscode = acquireVsCodeApi();
          window.vscode = vscode;
          window.$webview = {
          baiduAppid: "${baiduAppid}",
          baiduAppKey: "${baiduAppKey}"
          }
      </script>
    </head>
    <body>
      <div id="root"></div>
    </body>
    </html>`;
  }
}
