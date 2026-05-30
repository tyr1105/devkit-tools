"use client";

import { useState, useCallback } from "react";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

export default function ColorPage() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgbText, setRgbText] = useState("59,130,246");
  const [hslText, setHslText] = useState("217,91%,60%");

  const updateFromHex = useCallback(
    (value: string) => {
      setHex(value);
      const rgb = hexToRgb(value);
      if (rgb) {
        setRgbText(`${rgb[0]},${rgb[1]},${rgb[2]}`);
        const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        setHslText(`${hsl[0]},${hsl[1]}%,${hsl[2]}%`);
      }
    },
    []
  );

  const updateFromRgb = useCallback((value: string) => {
    const parts = value.split(",").map((s) => parseInt(s.trim()));
    if (parts.length === 3 && parts.every((v) => !isNaN(v) && v >= 0 && v <= 255)) {
      const [r, g, b] = parts as [number, number, number];
      setRgbText(value);
      setHex(rgbToHex(r, g, b));
      const hsl = rgbToHsl(r, g, b);
      setHslText(`${hsl[0]},${hsl[1]}%,${hsl[2]}%`);
    } else {
      setRgbText(value);
    }
  }, []);

  const updateFromHsl = useCallback((value: string) => {
    const parts = value
      .replace(/%/g, "")
      .split(",")
      .map((s) => parseInt(s.trim()));
    if (
      parts.length === 3 &&
      parts.every((v) => !isNaN(v)) &&
      parts[0] >= 0 && parts[0] <= 360 &&
      parts[1] >= 0 && parts[1] <= 100 &&
      parts[2] >= 0 && parts[2] <= 100
    ) {
      const [h, s, l] = parts as [number, number, number];
      setHslText(value);
      const rgb = hslToRgb(h, s, l);
      setHex(rgbToHex(rgb[0], rgb[1], rgb[2]));
      setRgbText(`${rgb[0]},${rgb[1]},${rgb[2]}`);
    } else {
      setHslText(value);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          颜色转换
        </h1>
        <p className="mt-1" style={{ color: "var(--muted)" }}>
          HEX、RGB、HSL 颜色格式互转
        </p>
      </div>

      {/* Color preview */}
      <div
        className="w-full h-40 rounded-lg border"
        style={{ backgroundColor: hex, borderColor: "var(--border)" }}
      />

      {/* Color picker */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          拾色器
        </label>
        <input
          type="color"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          className="w-12 h-10 cursor-pointer rounded border-0 p-0"
        />
      </div>

      {/* Input fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
            HEX
          </label>
          <input
            type="text"
            className="tool-input w-full font-mono"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            placeholder="#RRGGBB"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
            RGB
          </label>
          <input
            type="text"
            className="tool-input w-full font-mono"
            value={rgbText}
            onChange={(e) => updateFromRgb(e.target.value)}
            placeholder="r,g,b"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>
            HSL
          </label>
          <input
            type="text"
            className="tool-input w-full font-mono"
            value={hslText}
            onChange={(e) => updateFromHsl(e.target.value)}
            placeholder="h,s%,l%"
          />
        </div>
      </div>
    </div>
  );
}
