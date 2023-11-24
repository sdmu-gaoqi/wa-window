import { funcs } from "./func";

export const commands = [
  { key: "extension.xlsxToTs", value: "xlsxToTs", func: funcs.xlsxToTs },
];

// onStartup
// "when": "resourceFilename =~ /.*\\.xlsx$/",
