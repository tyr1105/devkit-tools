export function ToolPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">{title}</h1>
        <p className="mt-1 text-[var(--muted)]">{description}</p>
      </div>
      {children}
    </div>
  );
}
