import React from "react";
import { createRoot } from "react-dom/client";
import TextArea from "../component/TextArea";
import Label from "../component/Label";
import { useReactive } from "ahooks";
import { Button } from "../component/Button";
import { GlobalStyle } from "../component/Common";
import JsonToTS from "json-to-ts";
import { log } from "../../utils/log";
import Result from "../component/Result";

const Json2TsTsx = () => {
  const state = useReactive({
    content: "",
    result: [""],
  });

  const getDataByString = (data: string) => {
    return new Function("", "return " + data);
  };

  const json2ts = () => {
    if (!state?.content) {
      return;
    }
    try {
      const target = getDataByString(state?.content)();
      const res = JsonToTS(target);
      log(res);
      state.result = res;
    } catch (err) {
      state.result = ["格式错误 参考{name: 1}"];
    }
  };

  return (
    <div>
      <GlobalStyle />
      <TextArea
        placeholder="请输入需要转换的json"
        rows={5}
        value={state.content}
        onChange={(e) => (state.content = e.target.value)}
      />
      <div>
        <Label>转换结果:</Label>
        <Result>{state.result}</Result>
        <Button onClick={json2ts}>转换</Button>
      </div>
    </div>
  );
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<Json2TsTsx />);
}
