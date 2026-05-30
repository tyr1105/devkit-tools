"use client";

import { useState, useMemo } from "react";
import { ToolPage } from "@/components/ToolPage";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const result = useMemo(() => {
    if (!pattern) return { highlighted: testString, matches: [], groups: [], error: "" };
    try {
      const regex = new RegExp(pattern, flags);
      const matches: string[] = [];
      const groups: { match: string; index: number; groups: string[] }[] = [];

      if (flags.includes("g")) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          matches.push(match[0]);
          if (match.length > 1) {
            groups.push({
              match: match[0],
              index: match.index,
              groups: Array.from(match).slice(1),
            });
          }
          // Safety: prevent infinite loop on zero-length matches
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          matches.push(match[0]);
          if (match.length > 1) {
            groups.push({
              match: match[0],
              index: match.index,
              groups: Array.from(match).slice(1),
            });
          }
        }
      }

      // Build highlighted output
      let highlighted = testString;
      if (matches.length > 0) {
        // Escape HTML in the test string first
        const escaped = testString
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        // Find all match positions
        const positions: { start: number; end: number }[] = [];
        const posRegex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
        let posMatch;
        while ((posMatch = posRegex.exec(testString)) !== null) {
          positions.push({ start: posMatch.index, end: posMatch.index + posMatch[0].length });
          if (posMatch[0].length === 0) posRegex.lastIndex++;
        }

        // Build highlighted string from original (escaped)
        let result = "";
        let lastEnd = 0;
        let escapeOffset = 0;

        // We need to map original indices to escaped string indices
        // Simpler approach: rebuild from scratch
        const parts: { text: string; isMatch: boolean }[] = [];
        let prevEnd = 0;
        for (const pos of positions) {
          if (pos.start > prevEnd) {
            parts.push({ text: testString.slice(prevEnd, pos.start), isMatch: false });
          }
          parts.push({ text: testString.slice(pos.start, pos.end), isMatch: true });
          prevEnd = pos.end;
        }
        if (prevEnd < testString.length) {
          parts.push({ text: testString.slice(prevEnd), isMatch: false });
        }

        highlighted = parts
          .map((p) => {
            const escaped = p.text
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
            return p.isMatch ? `<mark>${escaped}</mark>` : escaped;
          })
          .join("");
      } else {
        highlighted = testString
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      return { highlighted, matches, groups, error: "" };
    } catch (e) {
      return {
        highlighted: testString
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;"),
        matches: [],
        groups: [],
        error: (e as Error).message,
      };
    }
  }, [pattern, flags, testString]);

  return (
    <ToolPage title="正则表达式测试" description="在线正则表达式测试工具，实时匹配高亮">
      <div className="space-y-4">
        {/* Pattern & Flags */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
              正则表达式
            </label>
            <input
              type="text"
              className="tool-input w-full font-mono text-sm"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="输入正则表达式，例如: \d+"
            />
          </div>
          <div className="w-32">
            <label className="block mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
              标志
            </label>
            <input
              type="text"
              className="tool-input w-full font-mono text-sm"
              value={flags}
              onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))}
              placeholder="g i m s"
            />
          </div>
        </div>

        {/* Flag toggles */}
        <div className="flex gap-2">
          {["g", "i", "m", "s"].map((flag) => (
            <button
              key={flag}
              className={`btn ${flags.includes(flag) ? "btn-primary" : "btn-secondary"} text-xs px-3 py-1`}
              onClick={() =>
                setFlags((prev) =>
                  prev.includes(flag) ? prev.replace(flag, "") : prev + flag
                )
              }
            >
              {flag}
            </button>
          ))}
        </div>

        {/* Test String */}
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
            测试字符串
          </label>
          <textarea
            className="tool-input w-full min-h-[150px] font-mono text-sm"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="输入需要测试的文本..."
          />
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              匹配结果
            </label>
            {result.error ? (
              <span className="text-xs text-red-500">正则语法错误</span>
            ) : (
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                匹配数: {result.matches.length}
              </span>
            )}
          </div>

          {result.error ? (
            <div className="tool-output text-red-500 text-sm">{result.error}</div>
          ) : (
            <div
              className="tool-output whitespace-pre-wrap font-mono text-sm"
              dangerouslySetInnerHTML={{ __html: result.highlighted || "&nbsp;" }}
            />
          )}

          {/* Match details */}
          {result.matches.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                匹配详情
              </div>
              <div className="space-y-1">
                {result.matches.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-mono rounded px-2 py-1"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <span style={{ color: "var(--muted)" }}>#{i + 1}</span>
                    <mark className="px-1 rounded">{m}</mark>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Groups */}
          {result.groups.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                捕获组
              </div>
              <div className="space-y-1">
                {result.groups.map((g, i) => (
                  <div
                    key={i}
                    className="text-xs font-mono rounded px-2 py-1 space-y-0.5"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <div>
                      <span style={{ color: "var(--muted)" }}>匹配: </span>
                      <mark className="px-1 rounded">{g.match}</mark>
                    </div>
                    {g.groups.map((grp, j) => (
                      <div key={j}>
                        <span style={{ color: "var(--muted)" }}>组 {j + 1}: </span>
                        <span style={{ color: "var(--primary)" }}>{grp || "(空)"}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolPage>
  );
}
