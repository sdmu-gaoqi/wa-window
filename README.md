# XlsxToTs

---

#### xlsx 文件自动转换 ts 语言配置

#### 插件配置

##### xlsxPath

插件生效的 csv 文件路径 比如 项目跟路径/src/locales/csv.csv 输入 /src/locales/csv.csv
默认值 /src/locales/locales.csv

##### xlsxTransformPath

转换保存的文件路径 没有的话自动创建路径
默认值 /src/locales

##### xlsxTransformLanauges

插件需要转换的语言表集合
默认值 ["zh-CN", "zh-TW", "en-US", "ja-JP", "ko-KR"]
生成的文件已这里的值作为文件名 比如 zh-CN.ts
