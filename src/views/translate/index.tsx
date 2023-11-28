import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import TextArea from "../component/TextArea";
import Select from "../component/Select";
import { baiduLangs, PostmessageType } from "../../constants/content";
import Label from "../component/Label";
import { useLockFn, useMount, useReactive } from "ahooks";
import { Button } from "../component/Button";
import bridge from "../../utils/bridge";

const TranslateTsx = () => {
  const state = useReactive({
    currentContent: "",
    currentLang: "zh",
    targetLang: "en",
    targetContent: "",
    loading: false,
  });

  const translate = useLockFn(async () => {
    if (state.loading) {
      return;
    }
    state.loading = true;
    bridge[PostmessageType.翻译](state);
  });

  useMount(() => {
    bridge[PostmessageType.翻译完成]((data) => {
      state.targetContent = data;
      state.loading = false;
    });
  });

  return (
    <div>
      <TextArea
        placeholder="请输入需要翻译的文字"
        rows={5}
        value={state.currentContent}
        onChange={(e) => (state.currentContent = e.target.value)}
      />
      <div>
        <Label>当前语种:</Label>
        <Select
          value={state.currentLang}
          onChange={(e) => (state.currentLang = e.target.value)}
        >
          {baiduLangs.map((item) => (
            <option value={item.command}>{item.label}</option>
          ))}
        </Select>
        <Label>目标语种:</Label>
        <Select
          value={state.targetLang}
          onChange={(e) => (state.targetLang = e.target.value)}
        >
          {baiduLangs.map((item) => (
            <option value={item.command}>{item.label}</option>
          ))}
        </Select>
        <div style={{ margin: "20px 0" }}>{state.targetContent}</div>
        <Button onClick={translate}>
          {state.loading ? "翻译中..." : "翻译"}
        </Button>
      </div>
    </div>
  );
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<TranslateTsx />);
}
