import type { Metadata } from "next";
import PersonalSafetyClient from "./PersonalSafetyClient";

export const metadata: Metadata = {
  title: "Personal Safety Training — Foundation Module — SafeHers",
  description:
    "Workshops covering situational awareness, instinct, secure movement, and personal protection. Built on twenty years of expertise. Designed for women across Africa and the world.",
};

export default function PersonalSafetyPage() {
  return (
    <>
      <PersonalSafetyClient />
    </>
  );
}
