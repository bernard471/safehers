import { getAllPostMetas } from "@/lib/blog";
import { getAllCaseStudyMetas } from "@/lib/caseStudies";
import HomeClient from "./HomeClient";

export default function HomePage() {
  const recentPosts = getAllPostMetas().slice(0, 3);
  const caseStudies = getAllCaseStudyMetas().slice(0, 3);

  return <HomeClient recentPosts={recentPosts} caseStudies={caseStudies} />;
}
