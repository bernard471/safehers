import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6 text-burgundy">Error 404</p>
      <h1 className="display text-[clamp(5rem,20vw,16rem)] font-light leading-none text-ink/10 mb-4">
        404
      </h1>
      <p className="display text-3xl mb-4">
        Page not{" "}
        <span className="display-italic text-burgundy">found</span>
      </p>
      <p className="body-prose text-ink/60 max-w-md mb-12">
        The page you are looking for does not exist or may have moved. Let
        us help you find what you need.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="bg-ink text-cream px-8 py-3 eyebrow hover:bg-burgundy transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/services"
          className="border border-ink px-8 py-3 eyebrow hover:bg-ink hover:text-cream transition-colors"
        >
          Our Programs
        </Link>
        <Link
          href="/contact"
          className="border border-ink px-8 py-3 eyebrow hover:bg-ink hover:text-cream transition-colors"
        >
          Contact
        </Link>
      </div>
      <div className="mt-20 text-ink/20 display text-9xl font-light select-none pointer-events-none">
        ✦
      </div>
    </div>
  );
}
