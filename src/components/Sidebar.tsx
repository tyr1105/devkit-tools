"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { tools } from "@/lib/tools";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-sm"
        aria-label="菜单"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* 遮罩 */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[var(--surface)] border-r border-[var(--border)] overflow-y-auto transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm">
              DK
            </div>
            <div>
              <div className="font-bold text-lg text-[var(--foreground)]">DevKit</div>
              <div className="text-xs text-[var(--muted)]">在线工具箱</div>
            </div>
          </Link>
        </div>

        {/* 工具列表 */}
        <nav className="p-3">
          <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider px-3 py-2">
            全部工具
          </div>
          {tools.map((tool) => {
            const isActive = pathname === tool.path;
            return (
              <Link
                key={tool.id}
                href={tool.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                  isActive
                    ? "bg-[var(--primary)] text-white font-medium"
                    : "text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <span className="text-base w-6 text-center flex-shrink-0">{tool.icon}</span>
                <span>{tool.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* 底部 */}
        <div className="p-4 border-t border-[var(--border)] mt-4">
          <div className="text-xs text-[var(--muted)] text-center">
            免费 · 无需注册 · 即开即用
          </div>
        </div>
      </aside>
    </>
  );
}
