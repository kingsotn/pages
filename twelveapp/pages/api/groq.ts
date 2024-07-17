import type { NextApiRequest, NextApiResponse } from 'next'
import Groq from "groq-sdk";

const GROQ_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { videoUrl } = req.body;

  if (videoUrl !== "https://www.youtube.com/watch?v=Nsx5RDVKZSk") {
    return res.status(400).json({ error: "Can't use this video... yet" });
  }

  const temperature: number = 0.5
  const system_prompt = `Video Description: The video features a comprehensive discussion led by various prominent figures from Y Combinator...`
  const user_prompt = `
    Based on this video description, I want to generate JSON Object of 5 keywords for Search Engine Optimization, and 5 for table of contents...
    `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: system_prompt, },
        { role: "user", content: user_prompt, },
      ],
      model: "llama3-70b-8192",
      response_format: { type: "json_object" },
      temperature: temperature,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    });

    return res.status(200).json(completion.choices[0].message.content);
  } catch (error) {
    console.error('error:', error);
    return res.status(500).json({ error: 'An error occurred while processing GROQ request' });
  }
}