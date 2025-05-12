"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const HyperText = ({
  text,
  duration = 1000,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) => {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interactions = useRef(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }

      if (interactions.current < text.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= interactions.current
              ? text[i]
              : alphabets[getRandomInt(26)]
          )
        );

        interactions.current = interactions.current + 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (text.length * 10));
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <div className="flex scale-100 cursor-default overflow-hidden py-2">
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.h1
            key={i}
            className={cn("font-mono", letter === "" ? "w-3" : "", className)}
            {...framerProps}
          >
            {letter.toUpperCase()}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HyperText;
