"use client";

import { useStorage } from "@liveblocks/react/suspense";

const Mistakes = () => {
  const { mistakeCount } = useStorage((storage) => storage);

  return (
    <span>
      <span className="mr-1 inline-block text-muted-foreground">Mistakes:</span>
      <span className="mr-[2px] inline-flex w-2">{mistakeCount}</span>
      <span>/</span>
      <span className="inline-flex w-2">3</span>
    </span>
  );
};

export default Mistakes;
