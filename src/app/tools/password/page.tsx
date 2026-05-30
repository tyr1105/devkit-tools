"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Strength = "weak" | "medium" | "strong" | "very strong";

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const STRENGTH_CONFIG: Record<Strength, { label: string; color: string; width: string }> = {
  weak: { label: "弱", color: "var(--error)", width: "25%" },
  medium: { label: "中", color: "var(--warning)", width: "50%" },
  strong: { label: "强", color: "var(--success)", width: "75%" },
  "very strong": { label: "非常强", color: "var(--success)", width: "100%" },
};

function evaluateStrength(password: string): Strength {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return "weak";
  if (score <= 3) return "medium";
  if (score <= 4) return "strong";
  return "very strong";
}

function generatePassword(
  length: number,
  options: { uppercase: boolean; lowercase: boolean; digits: boolean; symbols: boolean }
): string {
  let charset = "";
  const required: string[] = [];

  if (options.uppercase) {
    charset += CHARSETS.uppercase;
    required.push(CHARSETS.uppercase);
  }
  if (options.lowercase) {
    charset += CHARSETS.lowercase;
    required.push(CHARSETS.lowercase);
  }
  if (options.digits) {
    charset += CHARSETS.digits;
    required.push(CHARSETS.digits);
  }
  if (options.symbols) {
    charset += CHARSETS.symbols;
    required.push(CHARSETS.symbols);
  }

  if (!charset) {
    charset = CHARSETS.lowercase;
    required.push(CHARSETS.lowercase);
  }

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  const chars: string[] = [];

  // Ensure at least one character from each required charset
  for (let i = 0; i < required.length && i < length; i++) {
    const cs = required[i];
    const idx = array[i] % cs.length;
    chars.push(cs[idx]);
  }

  // Fill the rest randomly
  for (let i = required.length; i < length; i++) {
    const idx = array[i] % charset.length;
    chars.push(charset[idx]);
  }

  // Shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = array[i] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

export default function PasswordPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    digits: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<Strength | null>(null);

  const generate = () => {
    const pwd = generatePassword(length, options);
    setPassword(pwd);
    setStrength(evaluateStrength(pwd));
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Ensure at least one option is enabled
      if (!next.uppercase && !next.lowercase && !next.digits && !next.symbols) {
        return prev;
      }
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          密码生成
        </h1>
        <p className="mt-1" style={{ color: "var(--muted)" }}>
          随机密码生成器
        </p>
      </div>

      <div className="space-y-4">
        {/* Length slider */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              密码长度
            </label>
            <span className="text-sm font-mono" style={{ color: "var(--primary)" }}>
              {length}
            </span>
          </div>
          <input
            type="range"
            min={8}
            max={128}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs" style={{ color: "var(--muted)" }}>
            <span>8</span>
            <span>128</span>
          </div>
        </div>

        {/* Character type checkboxes */}
        <div className="flex flex-wrap gap-4">
          {(
            [
              ["uppercase", "大写字母 (A-Z)"],
              ["lowercase", "小写字母 (a-z)"],
              ["digits", "数字 (0-9)"],
              ["symbols", "特殊符号 (!@#…)"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer select-none"
              style={{ color: "var(--foreground)" }}
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => toggleOption(key)}
                className="accent-blue-500"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>

        {/* Generate button */}
        <button className="btn btn-primary w-full" onClick={generate}>
          生成密码
        </button>
      </div>

      {/* Result */}
      {password && (
        <div className="tool-output space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="flex-1 p-3 rounded font-mono text-sm break-all"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
            >
              {password}
            </div>
            <CopyButton text={password} />
          </div>

          {/* Strength indicator */}
          {strength && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  密码强度
                </span>
                <span className="text-xs font-medium" style={{ color: STRENGTH_CONFIG[strength].color }}>
                  {STRENGTH_CONFIG[strength].label}
                </span>
              </div>
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: "var(--border)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: STRENGTH_CONFIG[strength].width,
                    background: STRENGTH_CONFIG[strength].color,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
