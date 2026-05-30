import { ToolNetworkFooter } from "./ToolNetworkFooter";

export function Footer() {
  return (
    <>
      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-6 lg:ml-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
            <div>© 2025 DevKit 工具箱 · 免费在线工具</div>
            <div className="flex gap-4">
              <span>所有工具均在浏览器本地运行</span>
            </div>
          </div>
        </div>
      </footer>
      <ToolNetworkFooter />
    </>
  );
}
