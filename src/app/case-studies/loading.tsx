export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-32 animate-pulse">
      <div className="h-3 w-32 bg-ink/10 mb-8 rounded" />
      <div className="h-16 w-3/4 bg-ink/10 mb-4 rounded" />
      <div className="h-16 w-1/2 bg-ink/10 mb-16 rounded" />
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-ink/5 h-40 rounded" />
        ))}
      </div>
    </div>
  );
}
