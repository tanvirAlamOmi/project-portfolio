"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

interface LoaderContextType {
  isLoading: boolean;
  isMounted: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  setLoading: (state: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: true,
  isMounted: true,
  showLoader: () => {},
  hideLoader: () => {},
  setLoading: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const prevPathnameRef = useRef<string | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unmountTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);
  };

  const hideLoader = useCallback(() => {
    clearTimers();
    setIsLoading(false);
    unmountTimerRef.current = setTimeout(() => {
      setIsMounted(false);
    }, 400); // 400ms CSS fade-out transition duration
  }, []);

  const showLoader = useCallback((durationMs = 600) => {
    clearTimers();
    setIsMounted(true);
    setIsLoading(true);

    if (durationMs > 0) {
      hideTimerRef.current = setTimeout(() => {
        hideLoader();
      }, durationMs);
    }
  }, [hideLoader]);

  const setLoading = useCallback((state: boolean) => {
    if (state) {
      showLoader(0);
    } else {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  // 1. Initial Page Load (Window Load + Fallback Timer)
  useEffect(() => {
    const handleInitialLoad = () => {
      hideTimerRef.current = setTimeout(() => {
        hideLoader();
      }, 500);
    };

    if (document.readyState === "complete") {
      handleInitialLoad();
    } else {
      window.addEventListener("load", handleInitialLoad);
    }

    // Safety fallback: if page load takes too long, hide after 1200ms
    const fallbackTimer = setTimeout(() => {
      hideLoader();
    }, 1200);

    return () => {
      window.removeEventListener("load", handleInitialLoad);
      clearTimeout(fallbackTimer);
      clearTimers();
    };
  }, [hideLoader]);

  // 2. Next.js Route Change Trigger (Trigger loader smoothly on every page navigation)
  useEffect(() => {
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }

    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      showLoader(500);
    }
  }, [pathname, showLoader]);

  // 3. Global Custom Event Listener ("site-loader")
  useEffect(() => {
    const handleLoaderEvent = (e: Event) => {
      const customEvent = e as CustomEvent<boolean | { duration?: number }>;
      if (typeof customEvent.detail === "boolean") {
        setLoading(customEvent.detail);
      } else if (typeof customEvent.detail === "object" && customEvent.detail !== null) {
        showLoader(customEvent.detail.duration || 600);
      }
    };

    window.addEventListener("site-loader", handleLoaderEvent);
    return () => window.removeEventListener("site-loader", handleLoaderEvent);
  }, [setLoading, showLoader]);

  return (
    <LoaderContext.Provider
      value={{ isLoading, isMounted, showLoader, hideLoader, setLoading }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
