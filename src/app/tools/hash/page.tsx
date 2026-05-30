"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type HashResult = {
  algorithm: string;
  hash: string;
};

async function computeHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const buffer = await crypto.subtle.digest(algorithm, data);
  const array = Array.from(new Uint8Array(buffer));
  return array.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<HashResult[]>([]);

  const generate = async () => {
    if (!input) return;
    const algorithms = ["SHA-1", "SHA-256", "SHA-512"];
    const hashes = await Promise.all(
      algorithms.map(async (algo) => ({
        algorithm: algo,
        hash: await computeHash(algo, input),
      }))
    );
    setResults(hashes);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Hash 生成
        </h1>
        <p className="mt-1" style={{ color: "var(--muted)" }}>
          SHA 哈希值计算工具
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
            输入文本
          </label>
          <textarea
            className="tool-input w-full min-h-[120px] font-mono text-sm"
            placeholder="输入要计算哈希值的文本"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-full" onClick={generate} disabled={!input}>
          计算哈希
        </button>
      </div>

      {results.length > 0 && (
        <div className="tool-output space-y-3">
          {results.map((r) => (
            <div key={r.algorithm} className="flex items-start justify-between gap-3 p-3 rounded" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>
                  {r.algorithm}
                </div>
                <div className="font-mono text-sm break-all" style={{ color: "var(--foreground)" }}>
                  {r.hash}
                </div>
              </div>
              <CopyButton text={r.hash} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
