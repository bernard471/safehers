"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Check } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    interest: "partnership",
    country: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (r.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          organization: "",
          interest: "partnership",
          country: "",
          message: "",
          website: "",
        });
      } else {
        setStatus("error");
        setErrMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  };

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      {/* HERO */}
      <section className="pt-40 pb-16 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Contact SafeHer Foundation
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[1100px]">
            Let&apos;s<br />
            <span className="display-italic text-gold">talk.</span>
          </h1>
        </div>
      </section>
      <div className="gold-rule" />

      {/* CONTACT GRID */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left: Info */}
            <div className="lg:col-span-4">
              <p className="body-prose mb-12">
                Universities, governments, NGOs, corporations, donors,
                journalists, and funders — every conversation begins the same
                way. Tell us who you are and what you need. We&apos;ll respond
                within two business days.
              </p>

              <div className="space-y-10">
                <div>
                  <p className="eyebrow opacity-60 mb-3 flex items-center gap-2">
                    <MapPin size={12} /> Accra, Ghana
                  </p>
                  <p className="text-sm">
                    East Legon
                    <br />
                    Greater Accra Region
                    <br />
                    Ghana
                  </p>
                </div>
                <div>
                  <p className="eyebrow opacity-60 mb-3 flex items-center gap-2">
                    <MapPin size={12} /> Washington, D.C., USA
                  </p>
                  <p className="text-sm">
                    By appointment
                    <br />
                    United States
                  </p>
                </div>
                <div>
                  <p className="eyebrow opacity-60 mb-3 flex items-center gap-2">
                    <Mail size={12} /> Email
                  </p>
                  <p className="text-sm space-y-1">
                    <span className="block">hello@safehers.africa</span>
                    <span className="block opacity-70">
                      partnerships@safehers.africa
                    </span>
                    <span className="block opacity-70">
                      media@safehers.africa
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-ink text-cream p-12 lg:p-16 text-center"
                >
                  <div className="inline-flex w-16 h-16 rounded-full border-2 border-gold items-center justify-center mb-6">
                    <Check size={28} className="text-gold" />
                  </div>
                  <h3 className="display text-4xl lg:text-5xl mb-4">
                    Message received.
                  </h3>
                  <p className="body-prose opacity-90 max-w-md mx-auto mb-8">
                    Thank you for reaching out to SafeHer Foundation. We will
                    be in touch within two business days.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="eyebrow link-underline text-gold"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: "none" }}
                    onChange={update("website" as keyof typeof form)}
                  />
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="eyebrow opacity-60 block mb-2">
                        Your name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={update("name")}
                        className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors"
                      />
                    </div>
                    <div>
                      <label className="eyebrow opacity-60 block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={update("email")}
                        className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors"
                      />
                    </div>
                    <div>
                      <label className="eyebrow opacity-60 block mb-2">
                        Organisation
                      </label>
                      <input
                        value={form.organization}
                        onChange={update("organization")}
                        className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors"
                      />
                    </div>
                    <div>
                      <label className="eyebrow opacity-60 block mb-2">
                        Country
                      </label>
                      <input
                        value={form.country}
                        onChange={update("country")}
                        className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="eyebrow opacity-60 block mb-2">
                      I&apos;m interested in *
                    </label>
                    <select
                      required
                      value={form.interest}
                      onChange={update("interest")}
                      className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors"
                    >
                      <option value="partnership">
                        Strategic partnership or funding
                      </option>
                      <option value="certification">
                        Becoming a Certified Safety Educator
                      </option>
                      <option value="institutional">
                        Institutional programme for our organisation
                      </option>
                      <option value="donation">
                        Donating or sponsoring a cohort
                      </option>
                      <option value="volunteer">
                        Volunteering
                      </option>
                      <option value="speaking">Speaking engagement</option>
                      <option value="media">Media inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="eyebrow opacity-60 block mb-2">
                      Tell us more *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={update("message")}
                      className="w-full bg-transparent border-b border-ink/30 pb-3 outline-none focus:border-burgundy transition-colors resize-none"
                      placeholder="How would you like to work with SafeHer Foundation?"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-burgundy">{errMsg}</p>
                  )}

                  <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
                    <p className="text-xs opacity-60 max-w-md">
                      By submitting, you agree to be contacted by SafeHer
                      Foundation regarding your inquiry. We never share your
                      information.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-ink text-cream px-8 py-4 inline-flex items-center gap-3 hover:bg-burgundy transition-colors disabled:opacity-60 group"
                    >
                      <span className="eyebrow">
                        {status === "loading" ? "Sending..." : "Send message"}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="group-hover:rotate-45 transition-transform"
                      />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
