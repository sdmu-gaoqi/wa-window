import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import TextArea from "../component/TextArea";
import Label from "../component/Label";
import { useLockFn, useMount, useReactive } from "ahooks";
import { Button } from "../component/Button";
import bridge from "../../utils/bridge";
import { PostmessageType } from "../../constants/content";
import Select from "../component/Select";

const TranslateTsx = () => {
  const state = useReactive({
    content: "",
    aesKey: "",
    result: "",
    loading: false,
    digit: 16,
  });

  const aes = useLockFn(async () => {
    bridge[PostmessageType.解密](state);
  });

  useMount(() => {
    bridge[PostmessageType.解密完成]((data) => {
      state.result = data;
    });
  });

  return (
    <div>
      <TextArea
        placeholder="请输入需要解密的数据"
        rows={5}
        value={state.content}
        onChange={(e) => (state.content = e.target.value)}
      />
      <div>
        <Label>aesKey:</Label>
        <TextArea
          placeholder="请输入aesKey"
          rows={2}
          value={state.aesKey}
          onChange={(e) => (state.aesKey = e.target.value)}
        />
        <Label>位数:</Label>
        <Select
          value={state.digit}
          onChange={(e) => {
            state.digit = +e.target.value;
          }}
        >
          {[16, 24, 32].map((i) => (
            <option value={i}>{i}</option>
          ))}
        </Select>
        <Label>解密结果:</Label>
        <div style={{ margin: "20px 0" }}>{state.result}</div>
        <Button onClick={aes}>{state.loading ? "解密中..." : "解密"}</Button>
      </div>
    </div>
  );
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<TranslateTsx />);
}
