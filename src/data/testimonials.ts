import { asset } from "@/utils/asset";

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "magfi-reza-siddique",
    author: "MAGFI REZA SIDDIQUE",
    role: "Founder & Director",
    company: "Daahuk",
    quote: "Throughout the development process, Sejuti's attention to detail was remarkable. She showcased an exceptional eye for design, creating a visually appealing website that perfectly captured our organization's ethos.",
    avatar: asset("/assets/testimonials/magfi-reza.png")
  },
  {
    id: "aamar-pharma-team",
    author: "RAKIBUL HASAN",
    role: "Operations Head",
    company: "Aamar Pharma",
    quote: "Sejuti delivered a seamless experience for both our patient-facing mobile application and the dense order processing admin portal.",
    avatar: asset("/assets/testimonials/magfi-reza.png")
  },
  {
    id: "arbree-solutions-lead",
    author: "TANVIR AHMED",
    role: "Chief Technology Officer",
    company: "Arbree Solutions",
    quote: "Her design translated complex telemetry data into intuitive dashboards that our enterprise customers love using every single day.",
    avatar: asset("/assets/testimonials/magfi-reza.png")
  }
];

export const clientLogos = [
  { name: "Daahuk", image: asset("/assets/clients/daahuk.png") },
  { name: "Aamar Pharma", image: asset("/assets/clients/aamar-pharma.png") },
  { name: "Arbree Solutions", image: asset("/assets/clients/arbree-solutions.png") },
  { name: "Elevate Solutions", image: asset("/assets/clients/elevate-solutions.png") }
];
