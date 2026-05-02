export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-32 animate-pulse">
      <div className="h-3 w-24 bg-ink/10 mb-8 rounded" />
      <div className="h-16 w-2/3 bg-ink/10 mb-4 rounded" />
      <div className="h-16 w-1/2 bg-ink/10 mb-16 rounded" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-ink/5 h-64 rounded" />
        ))}
      </div>
    </div>
  );
}
