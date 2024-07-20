// File: pages/api/youtube-thumbnail.ts

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
    const response = await fetch(`https://img.youtube.com/vi/${videoId}/0.jpg`);
    
    if (!response.ok) throw new Error('Failed to fetch thumbnail');

    const imageBuffer = await response.arrayBuffer();
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('Error fetching thumbnail:', error);
    res.status(500).json({ error: 'Error fetching thumbnail' });
  }
}