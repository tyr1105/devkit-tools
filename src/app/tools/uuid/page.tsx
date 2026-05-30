"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export default function UUIDPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [batchCount, setBatchCount] = useState(10);

  const generateOne = () => {
    const id = crypto.randomUUID();
    setUuids((prev) => [id, ...prev]);
  };

  const generateBatch = () => {
    const count = Math.min(Math.max(batchCount, 1), 100);
    const newIds = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids((prev) => [...newIds, ...prev]);
  };

  const copyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  const clearAll = () => setUuids([]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          UUID 生成
        </h1>
        <p className="mt-1" style={{ color: "var(--muted)" }}>
          批量生成 UUID
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <button className="btn btn-primary flex-1" onClick={generateOne}>
            生成单个 UUID
          </button>
          <button className="btn btn-secondary" onClick={clearAll} disabled={uuids.length === 0}>
            清空
          </button>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
              批量数量（1-100）
            </label>
            <input
              type="number"
              className="tool-input w-full"
              min={1}
              max={100}
              value={batchCount}
              onChange={(e) => setBatchCount(parseInt(e.target.value) || 1)}
            />
          </div>
          <button className="btn btn-primary" onClick={generateBatch}>
            批量生成
          </button>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              已生成 {uuids.length} 个 UUID
            </span>
            <button className="btn btn-secondary text-sm" onClick={copyAll}>
              📋 复制全部
            </button>
          </div>
          <div className="tool-output space-y-2 max-h-[400px] overflow-y-auto">
            {uuids.map((id, i) => (
              <div
                key={`${id}-${i}`}
                className="flex items-center justify-between gap-2 p-2 rounded"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <span className="font-mono text-sm" style={{ color: "var(--foreground)" }}>
                  {id}
                </span>
                <CopyButton text={id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
