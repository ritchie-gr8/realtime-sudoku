"use client";

import { useOthersListener } from "@liveblocks/react/suspense";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link } from "lucide-react";
import QRCode from "react-qr-code";

const SidePanel = () => {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const pathname = usePathname();

  const animationsProps = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
    transition: { duration: 0.1 },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.origin + pathname);
    }
  }, [pathname]);

  useOthersListener(({ type, user }) => {
    switch (type) {
      case "enter":
        toast(`${user.info.name} just joined the game`);
        break;
      case "leave":
        toast(`${user.info.name} just left the game`);
        break;
    }
  });

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopied(true);
        if (timeoutId) clearTimeout(timeoutId);

        const id = setTimeout(() => {
          setCopied(false);
        }, 2000);

        setTimeoutId(id);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="hidden space-y-4 sm:block">
      <p className="text-muted-foreground text-sm">Share with friends</p>

      <Button
        variant="outline"
        className="w-full rounded"
        onClick={copyToClipboard}
        disabled={copied}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              className="flex place-items-center gap-1"
              {...animationsProps}
            >
              <Check className="mr-1 size-4" />
              Copied
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              className="flex place-items-center gap-1"
              {...animationsProps}
            >
              <Link className="mr-1 size-4" />
              Copy link
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <p className="text-xs text-muted-foreground">
        Share link to play together
      </p>
      <div className="w-full">
        <QRCode value={fullUrl} className="size-full" />
      </div>
      <p className="text-muted-foreground text-xs">Scan code to join game</p>
    </div>
  );
};

export default SidePanel;
