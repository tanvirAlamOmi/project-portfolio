"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { usePathname } from "next/navigation";

interface ActiveSectionContextType {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: "home",
  setActiveSection: () => { },
});

export function ActiveSectionProvider({
  children,
  defaultActive,
}: {
  children: React.ReactNode;
  defaultActive?: string;
}) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (defaultActive) return defaultActive;
    if (pathname?.startsWith("/about")) return "about";
    if (pathname?.startsWith("/work")) return "work";
    if (pathname?.startsWith("/blogs")) return "blogs";
    if (pathname?.startsWith("/contact")) return "contact";
    return "home";
  });

  useEffect(() => {
    if (defaultActive) {
      setActiveSection(defaultActive);
      return;
    }

    if (pathname?.startsWith("/about")) {
      setActiveSection("about");
    } else if (pathname?.startsWith("/work")) {
      setActiveSection("work");
    } else if (pathname?.startsWith("/blogs")) {
      setActiveSection("blogs");
    } else if (pathname?.startsWith("/contact")) {
      setActiveSection("contact");
    } else {
      setActiveSection("home");
    }
  }, [pathname, defaultActive]);

  return (
    <ActiveSectionContext.Provider
      value={{ activeSection, setActiveSection }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
