"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";

export default function UrlEncodeDecodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    setError("");
    try {
      setOutput(encodeURIComponent(input));
    } catch (e) {
      setError(`编码失败: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleDecode = () => {
    setError("");
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setError(`解码失败: 输入不是有效的编码 URL`);
      setOutput("");
    }
  };

  return (
    <ToolPage title="URL 编解码" description="URL 编码与解码转换工具">
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
            输入文本
          </label>
          <textarea
            className="tool-input w-full min-h-[200px] font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入需要编码或解码的 URL / 文本..."
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button className="btn btn-primary" onClick={handleEncode}>
            编码
          </button>
          <button className="btn btn-secondary" onClick={handleDecode}>
            解码
          </button>
        </div>

        {(output || error) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                输出结果
              </label>
              {output && !error && <CopyButton text={output} />}
            </div>
            {error ? (
              <div className="tool-output text-red-500 whitespace-pre-wrap">{error}</div>
            ) : (
              <div className="tool-output whitespace-pre-wrap font-mono text-sm break-all">
                {output}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPage>
  );
}
