import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { videoId } = req.query;

    if (!videoId || typeof videoId !== 'string') {
        return res.status(400).json({ error: 'Video ID is required and must be a string' });
    }

    console.log(">>>> yt-transcript")

    try {
        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
        const html = await response.text();

        const timedTextUrlMatch = html.match(/"(https:\/\/www\.youtube\.com\/api\/timedtext[^"]*)"/);
        if (!timedTextUrlMatch) throw new Error("No timedtext URL found");

        const timedTextUrl = timedTextUrlMatch[1].replace(/\\u0026/g, '&');

        const transcriptResponse = await fetch(timedTextUrl);
        const transcriptXml = await transcriptResponse.text();

        const parsedTranscript = transcriptXml.match(/<text[^>]*>(.*?)<\/text>/g)?.map(entry =>
            decodeURIComponent(entry.replace(/<[^>]*>/g, ''))
        ) || [];

        console.log(parsedTranscript)
        res.status(200).json({ transcript: parsedTranscript });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching the transcript' });
    }
}