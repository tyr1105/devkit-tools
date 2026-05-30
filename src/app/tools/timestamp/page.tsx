"use client";

import { useState, useEffect } from "react";
import { ToolPage } from "@/components/ToolPage";
import { CopyButton } from "@/components/CopyButton";

export default function TimestampPage() {
  const [now, setNow] = useState<Date>(new Date());
  const [inputTimestamp, setInputTimestamp] = useState("");
  const [tsResult, setTsResult] = useState<{
    iso: string;
    local: string;
    utc: string;
  } | null>(null);
  const [tsError, setTsError] = useState("");

  const [inputDate, setInputDate] = useState("");
  const [dateResult, setDateResult] = useState<{
    seconds: number;
    milliseconds: number;
  } | null>(null);
  const [dateError, setDateError] = useState("");

  // Auto-update current time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSecondsToDate = () => {
    setTsError("");
    setTsResult(null);
    const ts = Number(inputTimestamp);
    if (isNaN(ts)) {
      setTsError("请输入有效的数字时间戳");
      return;
    }
    const date = new Date(ts * 1000);
    if (isNaN(date.getTime())) {
      setTsError("无效的时间戳");
      return;
    }
    setTsResult({
      iso: date.toISOString(),
      local: date.toLocaleString("zh-CN", { dateStyle: "full", timeStyle: "long" }),
      utc: date.toUTCString(),
    });
  };

  const handleMillisecondsToDate = () => {
    setTsError("");
    setTsResult(null);
    const ts = Number(inputTimestamp);
    if (isNaN(ts)) {
      setTsError("请输入有效的数字时间戳");
      return;
    }
    const date = new Date(ts);
    if (isNaN(date.getTime())) {
      setTsError("无效的时间戳");
      return;
    }
    setTsResult({
      iso: date.toISOString(),
      local: date.toLocaleString("zh-CN", { dateStyle: "full", timeStyle: "long" }),
      utc: date.toUTCString(),
    });
  };

  const handleDateToTimestamp = () => {
    setDateError("");
    setDateResult(null);
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      setDateError("请输入有效的日期时间");
      return;
    }
    setDateResult({
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    });
  };

  const currentTsSeconds = Math.floor(now.getTime() / 1000);
  const currentTsMillis = now.getTime();

  return (
    <ToolPage title="时间戳转换" description="Unix 时间戳与日期时间互转">
      <div className="space-y-6">
        {/* Current time display */}
        <div
          className="rounded-lg p-4 space-y-1"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            当前时间戳
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>秒级: </span>
              <code className="font-mono font-semibold" style={{ color: "var(--primary)" }}>
                {currentTsSeconds}
              </code>
              <CopyButton text={String(currentTsSeconds)} />
            </div>
            <div>
              <span className="text-xs" style={{ color: "var(--muted)" }}>毫秒级: </span>
              <code className="font-mono font-semibold" style={{ color: "var(--primary)" }}>
                {currentTsMillis}
              </code>
              <CopyButton text={String(currentTsMillis)} />
            </div>
          </div>
          <div className="text-sm" style={{ color: "var(--foreground)" }}>
            {now.toLocaleString("zh-CN", { dateStyle: "full", timeStyle: "long" })}
          </div>
        </div>

        {/* Timestamp → Date */}
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
            时间戳 → 日期
          </label>
          <input
            type="text"
            className="tool-input w-full font-mono text-sm"
            value={inputTimestamp}
            onChange={(e) => setInputTimestamp(e.target.value)}
            placeholder="输入时间戳，例如: 1700000000"
          />
          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary" onClick={handleSecondsToDate}>
              秒级时间戳→日期
            </button>
            <button className="btn btn-secondary" onClick={handleMillisecondsToDate}>
              毫秒级时间戳→日期
            </button>
          </div>
          {tsError && (
            <div className="tool-output text-red-500 mt-2">{tsError}</div>
          )}
          {tsResult && (
            <div className="tool-output mt-2 space-y-1 font-mono text-sm">
              <div>
                <span style={{ color: "var(--muted)" }}>ISO: </span>
                {tsResult.iso}
              </div>
              <div>
                <span style={{ color: "var(--muted)" }}>本地时间: </span>
                {tsResult.local}
              </div>
              <div>
                <span style={{ color: "var(--muted)" }}>UTC: </span>
                {tsResult.utc}
              </div>
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div>
          <label className="block mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>
            日期 → 时间戳
          </label>
          <input
            type="datetime-local"
            className="tool-input w-full text-sm"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleDateToTimestamp}>
            转换为时间戳
          </button>
          {dateError && (
            <div className="tool-output text-red-500 mt-2">{dateError}</div>
          )}
          {dateResult && (
            <div className="tool-output mt-2 space-y-1 font-mono text-sm">
              <div>
                <span style={{ color: "var(--muted)" }}>秒级时间戳: </span>
                <span style={{ color: "var(--primary)" }}>{dateResult.seconds}</span>
                <CopyButton text={String(dateResult.seconds)} />
              </div>
              <div>
                <span style={{ color: "var(--muted)" }}>毫秒级时间戳: </span>
                <span style={{ color: "var(--primary)" }}>{dateResult.milliseconds}</span>
                <CopyButton text={String(dateResult.milliseconds)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolPage>
  );
}
