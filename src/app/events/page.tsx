"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowUpRight, Video, Globe } from "lucide-react";
import { SAMPLE_EVENTS } from "@/lib/events-data";

const typeLabels: Record<string, string> = {
  workshop: "Workshop",
  webinar: "Webinar",
  conference: "Conference",
  training: "Training",
  community: "Community",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
function formatTime(d: string) {
  return new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function EventsPage() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const now = new Date();
  const upcoming = SAMPLE_EVENTS.filter(e => e.isPublished && new Date(e.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = SAMPLE_EVENTS.filter(e => e.isPublished && new Date(e.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const events = filter === "upcoming" ? upcoming : past;

  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3 text-gold">
            <span className="inline-block w-8 h-px bg-gold" />
            Events &amp; Workshops
          </p>
          <h1 className="display text-[clamp(3rem,7vw,6rem)] font-light max-w-[1000px] mb-6">
            Join us in<br />
            <span className="display-italic text-gold">person or online.</span>
          </h1>
          <p className="body-prose max-w-2xl opacity-70 text-lg mb-8">
            Workshops, webinars, training sessions, and community events across Ghana and
            online. Learn safety skills alongside other women and girls.
          </p>
          <div className="flex items-center gap-4 text-sm opacity-50">
            <span className="flex items-center gap-2"><Calendar size={14} /> {upcoming.length} upcoming events</span>
            <span className="flex items-center gap-2"><Globe size={14} /> Virtual &amp; in-person</span>
          </div>
        </div>
      </section>
      <div className="gold-rule" />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Filter */}
          <div className="flex gap-2 mb-12">
            <button onClick={() => setFilter("upcoming")}
              className={`eyebrow px-5 py-2.5 transition-colors ${filter === "upcoming" ? "bg-ink text-cream" : "border border-ink/15 opacity-50 hover:opacity-100"}`}>
              Upcoming ({upcoming.length})
            </button>
            <button onClick={() => setFilter("past")}
              className={`eyebrow px-5 py-2.5 transition-colors ${filter === "past" ? "bg-ink text-cream" : "border border-ink/15 opacity-50 hover:opacity-100"}`}>
              Past ({past.length})
            </button>
          </div>

          {events.length === 0 ? (
            <div className="border border-ink/10 bg-cream p-16 text-center">
              <Calendar size={40} className="text-gold mx-auto mb-4" />
              <p className="display text-2xl mb-2">No {filter} events</p>
              <p className="body-prose opacity-60">
                {filter === "upcoming" ? "New events are added regularly. Subscribe to our newsletter for updates." : "Past event recordings may be available on request."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event, i) => {
                const spotsLeft = event.maxAttendees ? event.maxAttendees - event.registeredCount : null;
                const isFull = spotsLeft !== null && spotsLeft <= 0;
                return (
                  <motion.div key={event.slug}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="border border-ink/10 bg-cream hover:border-gold/30 transition-colors group"
                  >
                    <div className="grid lg:grid-cols-12 gap-6 p-8">
                      {/* Date block */}
                      <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-3">
                        <div className="bg-ink text-cream px-4 py-3 text-center min-w-[80px]">
                          <p className="display text-3xl leading-none">{new Date(event.date).getDate()}</p>
                          <p className="eyebrow text-[9px] text-gold mt-1">{new Date(event.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</p>
                        </div>
                        <span className={`eyebrow text-[9px] px-2 py-1 ${event.isVirtual ? "bg-gold/15 text-gold" : "bg-ink/5"}`}>
                          {typeLabels[event.type] || event.type}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="lg:col-span-7">
                        <h3 className="display text-xl lg:text-2xl mb-3 group-hover:text-burgundy transition-colors">{event.title}</h3>
                        <p className="text-sm opacity-60 mb-4 line-clamp-2">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs opacity-40">
                          <span className="flex items-center gap-1.5">
                            {event.isVirtual ? <Video size={12} /> : <MapPin size={12} />}
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1.5"><Clock size={12} /> {formatTime(event.date)} – {event.endDate ? formatTime(event.endDate) : ""}</span>
                          {event.maxAttendees && (
                            <span className="flex items-center gap-1.5"><Users size={12} /> {event.registeredCount}/{event.maxAttendees} registered</span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="lg:col-span-3 flex items-center justify-start lg:justify-end">
                        {filter === "upcoming" ? (
                          isFull ? (
                            <span className="eyebrow text-xs opacity-40">Fully booked</span>
                          ) : (
                            <Link href="/contact" className="bg-ink text-cream px-6 py-3 eyebrow text-xs hover:bg-burgundy transition-colors flex items-center gap-2">
                              Register <ArrowUpRight size={12} />
                            </Link>
                          )
                        ) : (
                          <span className="eyebrow text-xs opacity-30">Completed</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-20 bg-ink text-cream">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <p className="eyebrow text-gold mb-4">Stay updated</p>
          <h2 className="display text-4xl lg:text-5xl mb-6">Never miss an <span className="display-italic text-gold">event.</span></h2>
          <p className="body-prose opacity-60 max-w-md mx-auto mb-8">Subscribe to our newsletter for event announcements, workshop dates, and safety updates.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/academy" className="bg-gold text-ink px-7 py-4 eyebrow hover:bg-cream transition-colors inline-flex items-center gap-2">
              Explore Academy <ArrowUpRight size={14} />
            </Link>
            <Link href="/contact" className="border border-cream/30 px-7 py-4 eyebrow hover:bg-cream/10 transition-colors">
              Host an Event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
