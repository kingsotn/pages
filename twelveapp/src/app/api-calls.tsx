import { RegeneratedData } from "./right";

/**
 * This file contains utility functions and typings for making API calls to our server-side routes.
 * It provides a clean type for components to interact with the video analysis features,
 * abstracting away the details of the HTTP requests.
 */
export type GistState = {
    id: string;
    title: string;
    topics: string[];
    hashtags: string[];
}

export type SummaryState = {
    id: string;
    summary: string;
}

export type SeoAndTableOfContentsState = {
    seo: string[];
    tableOfContents: string[];
}

// Types for API responses
export type TwelveLabsGistResponse = {
    id: string;
    title: string;
    topics: string[];
    hashtags: string[];
}

export type TwelveLabsSummaryResponse = {
    id: string;
    summary: string;
}

export type GroqResponse = {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        };
        logprobs: null;
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        prompt_time: number;
        completion_tokens: number;
        completion_time: number;
        total_tokens: number;
        total_time: number;
    };
    system_fingerprint: string;
    x_groq: {
        id: string;
    };
}


export async function fetchTwelveLabsData(
    videoUrl: string,
    action: 'gist' | 'summary' | 'highlight' | 'chapter',
    temperature?: number,
    prompt?: string,
): Promise<TwelveLabsGistResponse | TwelveLabsSummaryResponse> {
    const response = await fetch('/api/twelvelabs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl, action, temperature, prompt }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

export type TitleAndContent = {
    title: string,
    content: string
}

export async function fetchGroqData(videoUrl: string, action: 'regenerate' | 'generate', prev_title: string, prev_content: string, popoverPrompt: string): Promise<any> {
    const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl, action, prev_title, prev_content, popoverPrompt }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

// transforms the response from the api to the actual typing that we expect for the state changes in the frontend client
export function transformGistData(data: TwelveLabsGistResponse): GistState {
    return {
        id: data.id,
        title: data.title,
        topics: data.topics,
        hashtags: data.hashtags
    };
}

export function transformSummaryData(data: TwelveLabsSummaryResponse): SummaryState {
    return {
        id: data.id,
        summary: data.summary
    };
}

export function transformSeoAndTocData(data: GroqResponse): SeoAndTableOfContentsState {
    console.log("groq transformSeoAndTocData response", data);
    // Check if data is already parsed
    const content = typeof data === 'string' ? JSON.parse(data) : data;

    return {
        seo: content.SEOKeywords || [],
        tableOfContents: content.TableOfContents || []
    };
}