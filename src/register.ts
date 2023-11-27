import * as vscode from "vscode";
import { commands } from "./commands";
export default class Extension {
  constructor() {}

  public registerCommands(context: vscode.ExtensionContext): void {
    commands.forEach((item) => {
      const command = vscode.commands.registerCommand(item.key, item.func);
      context.subscriptions.push(command);
    });
  }
}
