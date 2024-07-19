import React, { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Textarea } from "@nextui-org/react";

interface RegeneratePopoverProps {
    index: number;
    originalContent: string;
    originalTitle: string;
    regeneratedContent?: string;
    regeneratedTitle?: string;
    setRef: (el: HTMLDivElement | null, key: string) => void;
    onRegenerate: (index: number, prev_title: string, prev_content: string) => Promise<void>;
    isRegenerating: boolean;
    popoverPrompt: string;
    setPopoverPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const RegeneratePopover: React.FC<RegeneratePopoverProps> = ({
    index,
    originalContent,
    originalTitle,
    regeneratedContent,
    regeneratedTitle,
    setRef,
    onRegenerate,
    isRegenerating,
    popoverPrompt,
    setPopoverPrompt
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const displayTitle = regeneratedTitle ?? originalTitle;
    const displayContent = regeneratedContent ?? originalContent;

    useEffect(() => {
        setIsButtonDisabled(popoverPrompt.trim().length === 0 || isRegenerating);
    }, [popoverPrompt, isRegenerating]);

    useEffect(() => {
        console.log(`RegeneratePopover ${index} received new props:`, {
            regeneratedContent,
            regeneratedTitle
        });
    }, [index, regeneratedContent, regeneratedTitle]);

    const handleRegenerateClick = async () => {
        try {
            await onRegenerate(index, displayTitle, displayContent);
            setIsOpen(false);
            setPopoverPrompt("");
        } catch (error) {
            console.error("Error in regeneration:", error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <Popover
            placement="right"
            radius='sm'
            onOpenChange={(open: boolean) => setIsOpen(open)}
        >
            <PopoverTrigger>
                <div
                    ref={(el) => setRef(el, displayTitle)}
                    className="w-full min-w-[500.66px] p-4 rounded-xl hover:scale-[100.5%] transition-all cursor-pointer relative text-osm-black"
                >
                    <h3 className="text-xl font-bold mb-2">{displayTitle}</h3>
                    <p>{displayContent}</p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                        <div className="mt-2 flex flex-col gap-2 w-full text-osm-black">
                            <Textarea
                                placeholder="How would you like to adjust this section?"
                                value={popoverPrompt}
                                radius='sm'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPopoverPrompt(e.target.value)}
                                disabled={isRegenerating}
                            />
                            <Button
                                color="primary"
                                radius='sm'
                                isDisabled={isButtonDisabled}
                                isLoading={isRegenerating}
                                onClick={handleRegenerateClick}
                            >
                                <div className="text-osm-black">
                                    {isRegenerating ? "" : "Regenerate ⌘+↵"}
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