/**
 * This file contains utility functions for making API calls to our server-side routes.
 * It provides a clean interface for components to interact with the video analysis features,
 * abstracting away the details of the HTTP requests.
 */


// TwelveLabs Gist response type
interface TwelveLabsGistResponse {
    id: string;
    title: string;
    topics: string[];
    hashtags: string[];
}

// TwelveLabs Summary response type
interface TwelveLabsSummaryResponse {
    id: string;
    summary: string;
}

// GROQ response type
interface GroqResponse {
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
    action: 'gist' | 'summary',
    type?: string,
    prompt?: string,
    temperature?: number
): Promise<TwelveLabsGistResponse | TwelveLabsSummaryResponse> {
    const response = await fetch('/api/twelvelabs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl, action, temperature, type }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export async function fetchGroqData(videoUrl: string): Promise<GroqResponse> {
    const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}