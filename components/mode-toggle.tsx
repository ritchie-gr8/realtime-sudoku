"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const ModeToggle = () => {
  const { setTheme } = useTheme();
  const [effect, setEffect] = useState(false);

  const toggleTheme = (theme: string) => {
    setEffect(true);
    setTheme(theme);
  };

  return (
    <Button
      variant="ghost"
      className={cn("size-8 rounded-md px-0 text-black dark:text-white", {
        "animate-wiggle": effect,
      })}
      onAnimationEnd={() => setEffect(false)}
    >
      <div
        className="flex size-8 items-center justify-center dark:hidden"
        onClick={() => toggleTheme("dark")}
      >
        <Sun className="size-5" />
      </div>
      <div
        className="hidden size-8 items-center justify-center dark:inline-flex"
        onClick={() => toggleTheme("light")}
      >
        <Moon className="size-5" />
      </div>
    </Button>
  );
};

export default ModeToggle;
