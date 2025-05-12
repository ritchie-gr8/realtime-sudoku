"use client";

import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Settings } from "lucide-react";
import { CardDescription, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const GameSettings = () => {
  const validateMode = useStorage((root) => root.validateMode);
  const toggleValidateMode = useMutation(({ storage }, checked: boolean) => {
    storage.set("validateMode", !checked);
  }, []);

  return (
    <Popover>
      <PopoverTrigger>
        <Settings className="size-6" />
      </PopoverTrigger>
      <PopoverContent>
        <CardTitle className="text-lg">Game Settings</CardTitle>
        <CardDescription>
          These settings affect all players in the game
        </CardDescription>
        <div className="mt-4 flex items-center justify-between space-x-2">
          <Label className="flex flex-col space-y-1" htmlFor="necessary">
            <span>Check entries</span>
            <span className="font-normal text-muted-foreground leading-snug">
              Marks numbers in red (incorrect) or blue (correct)
            </span>
          </Label>
          <Switch
            checked={validateMode}
            onCheckedChange={() => toggleValidateMode(validateMode)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GameSettings;
