/**
 * This file serves as an API route for TwelveLabs video analysis.
 * It handles requests for video gists and summaries, interfacing with the TwelveLabs API.
 * The API key and sensitive operations are kept server-side for security.
 * It also stores the summary response for use in subsequent API calls.
 */
import type { NextApiRequest, NextApiResponse } from 'next'

const TWELVE_KEY = process.env.TWELVE_KEY; // from .env.local
const BASE_URL = 'https://api.twelvelabs.io/v1.2';
const TYPES = ['topic', 'hashtag', 'title']; // default types
const VIDEO_ID = "66959fe83ca9a432304de1c8"

export type Gist = {
  id: string;
  title: string;
  topics: string[];
  hashtags: string[];
};

export type Summary = {
  id: string;
  summary: string;
};

if (!TWELVE_KEY) {
  throw new Error('API key is not defined in environment variables');
}

// stub for fetching the index if we aren't using a demo video
const fetchIndex = async (): Promise<string> => {
  return 'some_video_id';
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { videoUrl, action } = req.body;
  if (!videoUrl || !action) return res.status(400).json({ error: 'videoUrl and action are required' });

  // use demo video (VIDEO_ID) or not
  const videoId: string = (videoUrl === "https://www.youtube.com/watch?v=Nsx5RDVKZSk")
    ? VIDEO_ID
    : await fetchIndex();

  if (action === 'gist') {
    const url = `${BASE_URL}/gist`;
    const options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-api-key': TWELVE_KEY as string,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ video_id: videoId, types: TYPES })
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error('error:', err);
      return res.status(500).json({ error: 'An error occurred while fetching gist' });
    }
  }

  if (action === 'summary') {
    const { type = 'summary', prompt, temperature } = req.body;
    const url = `${BASE_URL}/summarize`;
    const options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-api-key': TWELVE_KEY as string,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        video_id: videoId,
        type,
        ...(prompt && { prompt }),
        ...(temperature !== undefined && { temperature })
      })
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error('error:', err);
      return res.status(500).json({ error: 'An error occurred while fetching summary' });
    }
  }

  return res.status(400).json({ error: 'Invalid action' });
}