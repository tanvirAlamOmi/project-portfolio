import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import WorkProjectDetailView from "@/components/work/WorkProjectDetailView";
import { WORK_PROJECTS, WorkCategory } from "@/data/workProjects";

interface WorkProjectPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];

  WORK_PROJECTS.forEach((project) => {
    // 1. Natural category route: /work/websites/miftas-indian-dining
    params.push({
      category: project.category,
      slug: project.slug,
    });
    // 2. Universal project route: /work/project/miftas-indian-dining
    params.push({
      category: "project",
      slug: project.slug,
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: WorkProjectPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const project =
    WORK_PROJECTS.find(
      (p) =>
        p.slug === slug &&
        (p.category === category || category === "project")
    ) || WORK_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Sejuti Mehjabin",
    };
  }

  const coverImg = project.cardScreenshots?.[0] || project.thumbnail;

  return {
    title: `${project.title} — Work | Sejuti Mehjabin`,
    description: project.description,
    alternates: {
      canonical: `/work/${project.category}/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Work | Sejuti Mehjabin`,
      description: project.description,
      url: `https://sejutimehjabin.com/work/${project.category}/${project.slug}`,
      type: "article",
      images: [
        {
          url: coverImg,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Work | Sejuti Mehjabin`,
      description: project.description,
      images: [coverImg],
    },
  };
}

export default async function WorkProjectSinglePage({
  params,
}: WorkProjectPageProps) {
  const { category, slug } = await params;
  const project =
    WORK_PROJECTS.find(
      (p) =>
        p.slug === slug &&
        (p.category === category || category === "project")
    ) || WORK_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col justify-center text-[var(--ink)]">
      <div className="w-full max-w-[1440px] mx-auto flex-1 h-full relative flex flex-col justify-center items-center">
        <Sidebar defaultActive="work" />

        <main className="w-full h-full lg:pl-[var(--sidebar-w)] flex items-center justify-center p-2 sm:p-4">
          <WorkProjectDetailView project={project} />
        </main>
      </div>
    </div>
  );
}

