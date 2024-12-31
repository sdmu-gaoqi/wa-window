import React from "react";
import copy from "copy-to-clipboard";
import { Button } from "../Button";

const Result = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div style={{ margin: "20px 0" }}>{props.children || ""}</div>
      <Button
        onClick={() => {
          copy(props.children as any);
        }}
      >
        复制
      </Button>
    </>
  );
};

export default Result;
