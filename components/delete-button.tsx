"use client";

import { ReactNode, useContext } from "react";
import { Button, ButtonProps } from "./ui/button";
import { TableCellContext } from "@/context/table-cell-context";
import { useMutation } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";

interface DeleteButtonProps extends ButtonProps {
  children: ReactNode;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  children,
  ...props
}) => {
  const { tableCell } = useContext(TableCellContext);

  const erase = useMutation(({ storage }, index: number) => {
    if (index === null) return;

    const sudoku = storage.get("sudoku");
    const undoHistory = storage.get("undoHistory");
    if (sudoku.get(index)?.get("immutable") === true) return;

    let currentVal = sudoku?.get(index)?.get("value");
    if (currentVal === undefined) return;

    if (typeof currentVal === "object" && currentVal !== null) {
      currentVal = currentVal.clone();
    }

    const history = new LiveObject<HistoryStack>({
      index,
      valueBefore: currentVal,
      valueAfter: 0,
      mode: "erase",
    });
    undoHistory.push(history);

    sudoku.get(index)?.update({
      value: 0,
      valid: false,
    });
  }, []);

  return (
    <Button {...props} onClick={() => erase(tableCell.index!)}>
      {children}
    </Button>
  );
};
