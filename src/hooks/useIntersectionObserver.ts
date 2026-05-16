"use client";

import { useCallback, useEffect, useState } from "react";

type UseIntersectionObserverOptions = IntersectionObserverInit & {
  /** Freeze the observer once the element becomes visible. */
  freezeOnceVisible?: boolean;
};

/**
 * Lightweight IntersectionObserver hook for scroll-triggered animations.
 * Keeps logic centralized and avoids repeating observer setup in components.
 */
export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.2,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = true,
  } = options;

  const [node, setNode] = useState<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useCallback((element: T | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (freezeOnceVisible) observer.disconnect();
        } else if (!freezeOnceVisible) {
          setIsIntersecting(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [node, threshold, root, rootMargin, freezeOnceVisible]);

  return { ref, isIntersecting };
}
