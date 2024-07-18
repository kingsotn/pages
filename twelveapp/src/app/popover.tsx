import React, { useState, useEffect } from "react";
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
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        setIsButtonDisabled(prompt.trim().length === 0);
    }, [prompt]);

    return (
        <Popover
            placement="right"
            radius='sm'
            onOpenChange={(open: boolean) => setIsOpen(open)}
        >
            <PopoverTrigger>
                <div
                    ref={(el) => setRef(el, tableOfContentsItem)}
                    className="w-full min-w-[500.66px] p-4 rounded-xl hover:scale-[100.5%] transition-all cursor-pointer relative text-osm-black"
                >
                    <h3 className="text-xl font-bold mb-2">{tableOfContentsItem}</h3>
                    <p>{content}</p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                        <div className="mt-2 flex flex-col gap-2 w-full text-osm-black">
                            <Textarea
                                placeholder="How would you like to adjust this section?"
                                value={prompt}
                                radius='sm'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                            />
                            <Button
                                color="primary"
                                radius='sm'
                                isDisabled={isButtonDisabled}
                                onClick={() => {
                                    onRegenerate(index, prompt);
                                    setIsOpen(false);
                                    setPrompt("");
                                }}
                            >
                                <div className="text-osm-black">
                                    Regenerate ⌘+↵
                                </div>
                            </Button>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default RegeneratePopover;