// popover.tsx

import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Textarea } from "@nextui-org/react";

interface RegeneratePopoverProps {
  index: number;
  content: string;
  tableOfContentsItem: string;
  setRef: (el: HTMLDivElement | null, key: string) => void;
  onRegenerate: (index: number, prompt: string) => void;
}

const RegeneratePopover: React.FC<RegeneratePopoverProps> = ({ 
  index, 
  content, 
  tableOfContentsItem, 
  setRef, 
  onRegenerate 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  return (
    <Popover placement="right" isOpen={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
      <PopoverTrigger>
        <div
          ref={(el) => setRef(el, tableOfContentsItem)}
          className="w-full min-w-[500.66px] p-4 rounded-xl hover:scale-[102%] hover:shadow-lg transition-all cursor-pointer relative"
          onClick={() => setIsOpen(true)}
        >
          <h3 className="text-xl font-bold mb-2">{tableOfContentsItem}</h3>
          <p>{content}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Adjust Prompt
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Textarea
                placeholder="How would you like to adjust this section?"
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
              />
              <Button color="primary" onClick={() => {
                onRegenerate(index, prompt);
                setIsOpen(false);
                setPrompt("");
              }}>
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default RegeneratePopover;