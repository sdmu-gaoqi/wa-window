import * as vscode from "vscode";
import AesProvider from "./provider/aes";
import TranslateWebview from "./webviews/instance/translate";
import AesWebview from "./webviews/instance/aes";

export default class Extension {
  constructor() {}

  public registerCommands(context: vscode.ExtensionContext): void {
    new AesProvider(context);
    vscode.window.registerWebviewViewProvider(
      "wa-translate",
      new TranslateWebview(context),
      {
        webviewOptions: {
          retainContextWhenHidden: false,
        },
      }
    );
    vscode.window.registerWebviewViewProvider(
      "wa-aes-decrypt",
      new AesWebview(context),
      {
        webviewOptions: {
          retainContextWhenHidden: false,
        },
      }
    );
  }
}
