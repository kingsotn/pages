// File: pages/api/youtube-info.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId } = req.query;

  if (!videoId || typeof videoId !== 'string') {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await response.text();

    // Extract title from meta tags
    const titleMatch = html.match(/<meta name="title" content="(.*?)"/);
    const title = titleMatch ? titleMatch[1] : 'Unknown Title';

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    res.status(200).json({ title, thumbnailUrl });
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Error fetching video info' });
  }
}