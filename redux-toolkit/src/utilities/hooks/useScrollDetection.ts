import { useEffect, useState } from "react";

const useScrollDetection = ({
  debounceMs,
}: {
  debounceMs?: number;
}): { scrollPercentage: number } => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const scrolled = scrollTop + windowHeight;
    const percentageScrolled = (scrolled / documentHeight) * 100;

    setScrollPercentage(percentageScrolled);
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    const updateScrollPercentage = () => {
      if (!timeoutId) {
        handleScroll();
        timeoutId = setTimeout(() => {
          timeoutId = undefined;
        }, debounceMs);
      }
    };

    window.addEventListener("scroll", updateScrollPercentage);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", updateScrollPercentage);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceMs]);

  return { scrollPercentage };
};

export default useScrollDetection;
