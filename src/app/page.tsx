import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
          DevKit 工具箱
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)] max-w-2xl">
          免费在线开发者工具集合。所有工具在浏览器本地运行，无需注册，无需上传数据，即开即用。
        </p>
      </div>

      {/* 工具网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.path}
            className="group block p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors">
                {tool.icon}
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {tool.name}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* SEO内容 */}
      <div className="mt-16 prose prose-sm text-[var(--muted)] max-w-none">
        <h2 className="text-[var(--foreground)]">关于 DevKit 工具箱</h2>
        <p>
          DevKit 工具箱是一套免费在线开发者工具，涵盖 JSON 格式化、Base64 编解码、
          URL 编解码、时间戳转换、正则表达式测试、二维码生成、Hash 计算、UUID 生成、
          颜色转换、密码生成器等常用功能。
        </p>
        <p>
          所有工具均在你浏览器本地运行，数据不会上传到任何服务器，安全可靠。
          无需注册账号，打开即用。支持手机和电脑访问。
        </p>
      </div>
    </div>
  );
}
