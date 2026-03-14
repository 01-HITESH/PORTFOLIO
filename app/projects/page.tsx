import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects built by Alex Morgan — from analytics platforms to design systems.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <Projects />
    </div>
  );
}
