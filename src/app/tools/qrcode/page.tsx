"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { CopyButton } from "@/components/CopyButton";

export default function QRCodePage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [dataUrl, setDataUrl] = useState("");

  const generate = async () => {
    if (!text.trim()) return;
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      });
      setDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qrcode_${size}px.png`;
    a.click();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          二维码生成
        </h1>
        <p className="mt-1" style={{ color: "var(--muted)" }}>
          在线生成二维码
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
            内容（URL 或文本）
          </label>
          <input
            type="text"
            className="tool-input w-full"
            placeholder="输入 URL 或文本内容"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
            尺寸
          </label>
          <div className="flex gap-2">
            {[128, 256, 512].map((s) => (
              <button
                key={s}
                className={`btn ${size === s ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setSize(s)}
              >
                {s} × {s}
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary w-full" onClick={generate} disabled={!text.trim()}>
          生成二维码
        </button>
      </div>

      {dataUrl && (
        <div className="tool-output space-y-4 flex flex-col items-center">
          <img src={dataUrl} alt="QR Code" className="border rounded" style={{ borderColor: "var(--border)" }} />
          <div className="flex gap-3">
            <button className="btn btn-primary" onClick={download}>
              📥 下载图片
            </button>
            <CopyButton text={text} />
          </div>
        </div>
      )}
    </div>
  );
}
