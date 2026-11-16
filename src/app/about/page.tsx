import React from 'react';
import type { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import AboutPageView from '@/components/sections/AboutPageView';

export const metadata: Metadata = {
  title: 'About | Sejuti Mehjabin',
  description:
    'Multidisciplinary Designer specializing in UX & UI Design. Learn more about Sejuti Mehjabin, background, design journey, philosophy, and expertise.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Sejuti Mehjabin',
    description:
      'Multidisciplinary Designer specializing in UX & UI Design. Learn more about Sejuti Mehjabin, background, design journey, philosophy, and expertise.',
    url: 'https://sejutimehjabin.com/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Sejuti Mehjabin',
    description:
      'Multidisciplinary Designer specializing in UX & UI Design. Learn more about Sejuti Mehjabin, background, design journey, philosophy, and expertise.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--ink)]">
      <div className="w-full max-w-[1440px] mx-auto flex-1 relative">
        <Sidebar defaultActive="about" />

        <main className="w-full lg:pl-[var(--sidebar-w)] pt-14 lg:pt-0 pb-16 lg:pb-0">
          <AboutPageView />
        </main>
      </div>

      <Footer />
    </div>
  );
}
