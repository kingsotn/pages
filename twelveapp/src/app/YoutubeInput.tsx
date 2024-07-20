import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Input, Tooltip } from "@nextui-org/react";
import Clip from './clip';

interface YouTubeInputProps {
    initialVideoUrl: string;
    onVideoUrlChange: (url: string) => void;
    isValidYouTubeUrl: (url: string) => boolean;
    handleKeyDown: (e: React.KeyboardEvent<any>, field: string) => void;
    yc_video: string;
}

interface VideoInfo {
    title: string;
    thumbnailUrl: string;
}

const YouTubeInput: React.FC<YouTubeInputProps> = React.memo(({
    initialVideoUrl,
    onVideoUrlChange,
    isValidYouTubeUrl,
    handleKeyDown,
    yc_video
}) => {
    const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync internal state with prop
    useEffect(() => {
        setVideoUrl(initialVideoUrl);
    }, [initialVideoUrl]);

    const getYouTubeVideoId = useCallback((url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }, []);

    const fetchVideoInfo = useCallback(async (videoId: string) => {
        try {
            const response = await fetch(`/api/youtube-info?videoId=${videoId}`);
            if (response.ok) {
                const data = await response.json();
                setVideoInfo(data);
                setIsTooltipOpen(true);
                setTimeout(() => {
                    setIsTooltipOpen(false);
                }, 2000);
            } else {
                setVideoInfo(null);
            }
        } catch (error) {
            console.error('Error fetching video info:', error);
            setVideoInfo(null);
        }
    }, []);

    useEffect(() => {
        if (videoUrl && isValidYouTubeUrl(videoUrl)) {
            const videoId = getYouTubeVideoId(videoUrl);
            if (videoId) {
                fetchVideoInfo(videoId);
            }
        } else {
            setVideoInfo(null);
        }
    }, [videoUrl, isValidYouTubeUrl, getYouTubeVideoId, fetchVideoInfo]);

    const handleInputKeyDown = useCallback((e: React.KeyboardEvent<any>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            setIsTooltipOpen(true);
            setTimeout(() => {
                setIsTooltipOpen(false);
            }, 2000);
        }
        handleKeyDown(e, "videoUrl");
    }, [handleKeyDown]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setVideoUrl(newUrl);
        onVideoUrlChange(newUrl);
    }, [onVideoUrlChange]);

    const tooltipContent = useMemo(() => (
        <div className="p-2 rounded-lg shadow-lg bg-white border border-gray-200">
            {videoInfo ? (
                <div className="relative">
                    <img
                        src={videoInfo.thumbnailUrl}
                        alt="YouTube Thumbnail"
                        className="w-[320px] h-[180px] object-cover rounded-md"
                    />
                </div>
            ) : (
                <div className="w-[320px] h-[180px] flex items-center justify-center rounded-md">
                    <span className="text-osm-black">No thumbnail available</span>
                </div>
            )}
            <div className="mt-2 text-sm text-osm-black truncate max-w-[320px]">
                {videoInfo ? videoInfo.title : "No video title"}
            </div>
        </div>
    ), [videoInfo]);

    return (
        <Tooltip
            content={tooltipContent}
            placement="right"
            offset={30}
            delay={0}
            closeDelay={0}
            isDisabled={!videoInfo}
            isOpen={isTooltipOpen}
        >
            <Input
                ref={inputRef}
                startContent={<Clip />}
                isRequired
                radius="sm"
                labelPlacement="outside"
                label="Youtube Link (mock YC video)"
                placeholder={yc_video}
                variant="bordered"
                value={videoUrl}
                isInvalid={!isValidYouTubeUrl(videoUrl)}
                className="max-w-full rounded-sm"
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
            />
        </Tooltip>
    );
});

export default YouTubeInput;