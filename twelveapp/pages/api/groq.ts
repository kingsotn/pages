import type { NextApiRequest, NextApiResponse } from 'next'
import Groq from "groq-sdk";

const GROQ_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_KEY })

export type SeoAndTableOfContents = {
  seo: string[],
  tableOfContents: string[],
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { videoUrl } = req.body;

  if (videoUrl !== "https://www.youtube.com/watch?v=Nsx5RDVKZSk") {
    return res.status(400).json({ error: "Can't use this video... yet" });
  }

  const temperature: number = 0.5
  const system_prompt = `Video Description:
The video features a comprehensive discussion led by various prominent figures from Y Combinator, including Michael Seibel, Diana, Gustav, Tom, Harj, and Pete, focusing on the crucial topic of launching startup products. The content emphasizes the common fears and misconceptions that founders have about launching their products, particularly the false belief that a launch must be perfect and that a failed launch will have dire consequences. \nThe speakers stress the importance of launching early and often, arguing that the real value lies in the learning and feedback gained from each launch. They discuss how many founders, especially those with experience in large companies like Apple and Google, mistakenly believe that they need to spend extensive time and resources polishing their products before launching. The video debunks this myth, highlighting that for startups, an iterative approach to launching is far more effective, allowing them to learn from real-world feedback and make necessary improvements.\nMichael Seibel and Diana specifically address the dangers of \"pop culture knowledge\" and the unrealistic expectations it sets for startup founders. They illustrate that most successful companies had multiple launches before gaining traction, using examples like Airbnb, which launched three times before achieving success. The speakers also touch on the psychological barriers that prevent founders from launching, such as the fear of failure and rejection. They advocate for a mindset shift where learning and iteration are prioritized over perfection.\nThe video also covers practical advice on handling the aftermath of a launch, especially if it does not go as planned. Founders are encouraged to diagnose problems analytically, tweak their approaches, and re-launch rather than considering an initial failure as a definitive setback. The importance of targeting the right customers and learning to love rejection is also discussed, as these experiences help refine the product and business approach.\nTowards the end, the video provides motivational insights, encouraging founders to embrace the discomfort of feedback and criticism as part of the growth process. It concludes with a call to action, inviting viewers to explore Y Combinator's resources and support for launching their products and iterating based on customer feedback.\nOverall, the video serves as an informative and motivational guide for startup founders, emphasizing the importance of launching early, learning from each experience, and continuously improving their products to achieve success.`
  const user_prompt = `
    Based on this video description, I want to generate JSON Object of 5 keywords for Search Engine Optimization, and 5 for table of contents.
    An example JSON output would be:
    {
    "seo": ["eBike", "Bike", "Bicycle", "Commuters", "Trees"],
    "tableOfContents" : ["Introduction", "Getting Started", "Basic Concepts", "Advanced Techniques", "Practical Applications"],
    }
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