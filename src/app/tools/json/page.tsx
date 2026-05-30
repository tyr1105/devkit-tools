"use client";

import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleBeautify = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError(`格式化失败: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleMinify = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError(`压缩失败: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleValidate = () => {
    setError("");
    try {
      JSON.parse(input);
      setOutput("✅ JSON 格式正确");
    } catch (e) {
      setError(`❌ JSON 格式错误: ${(e as Error).message}`);
      setOutput("");
    }
  };

  return (
    <ToolPage title="JSON 格式化" description="JSON 格式化、压缩和验证工具">
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
            输入 JSON
          </label>
          <textarea
            className="tool-input w-full min-h-[200px] font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button className="btn btn-primary" onClick={handleBeautify}>
            格式化
          </button>
          <button className="btn btn-secondary" onClick={handleMinify}>
            压缩
          </button>
          <button className="btn btn-secondary" onClick={handleValidate}>
            验证
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
              <div className="tool-output whitespace-pre-wrap font-mono text-sm">{output}</div>
            )}
          </div>
        )}
      </div>
    </ToolPage>
  );
}
