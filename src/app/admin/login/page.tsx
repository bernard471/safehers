"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials. Check your email and password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-cream mb-12 text-center">
          <h1 className="display text-5xl font-light mb-2">SafeHers</h1>
          <span className="text-rose text-2xl">✦</span>
          <p className="eyebrow text-cream/40 mt-4">Admin Panel</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-cream p-10 space-y-5">
          <div>
            <label className="eyebrow text-xs opacity-60 block mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@safehers.africa"
              className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-ink/50 bg-transparent"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="eyebrow text-xs opacity-60 block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-ink/50 bg-transparent"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-xs text-burgundy">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-cream py-3 eyebrow hover:bg-burgundy transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-cream/30 text-xs mt-6">
          Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env.local to enable login.
        </p>
      </div>
    </div>
  );
}
