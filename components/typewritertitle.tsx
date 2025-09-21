import { useEffect, useState } from "react";

interface TypewriterTitleProps {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function TypewriterTitle({
  text,
  el: El = "h2",
  className = "",
}: TypewriterTitleProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return <El className={className}>{displayed}</El>;
}
