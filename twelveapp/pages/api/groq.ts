import type { NextApiRequest, NextApiResponse } from 'next'
import Groq from "groq-sdk";

const GROQ_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_KEY })

export type SeoAndTableOfContents = {
  seo: string[],
  tableOfContents: string[],
  sectionContent: string[],
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { videoUrl, action, prev_title, prev_content, popoverPrompt, section_count, requirements } = req.body; //action: 'regenerate' | 'generate'

  if (videoUrl !== "https://www.youtube.com/watch?v=Nsx5RDVKZSk") {
    return res.status(400).json({ error: "Can't use this video... yet" });
  }

  // normal generate
  let system_prompt = `Video Description: The video features a comprehensive discussion led by various prominent figures from Y Combinator, including Michael Seibel, Diana, Gustav, Tom, Harj, and Pete, focusing on the crucial topic of launching startup products. The content emphasizes the common fears and misconceptions that founders have about launching their products, particularly the false belief that a launch must be perfect and that a failed launch will have dire consequences. \nThe speakers stress the importance of launching early and often, arguing that the real value lies in the learning and feedback gained from each launch. They discuss how many founders, especially those with experience in large companies like Apple and Google, mistakenly believe that they need to spend extensive time and resources polishing their products before launching. The video debunks this myth, highlighting that for startups, an iterative approach to launching is far more effective, allowing them to learn from real-world feedback and make necessary improvements.\nMichael Seibel and Diana specifically address the dangers of \"pop culture knowledge\" and the unrealistic expectations it sets for startup founders. They illustrate that most successful companies had multiple launches before gaining traction, using examples like Airbnb, which launched three times before achieving success. The speakers also touch on the psychological barriers that prevent founders from launching, such as the fear of failure and rejection. They advocate for a mindset shift where learning and iteration are prioritized over perfection.\nThe video also covers practical advice on handling the aftermath of a launch, especially if it does not go as planned. Founders are encouraged to diagnose problems analytically, tweak their approaches, and re-launch rather than considering an initial failure as a definitive setback. The importance of targeting the right customers and learning to love rejection is also discussed, as these experiences help refine the product and business approach.\nTowards the end, the video provides motivational insights, encouraging founders to embrace the discomfort of feedback and criticism as part of the growth process. It concludes with a call to action, inviting viewers to explore Y Combinator's resources and support for launching their products and iterating based on customer feedback.\nOverall, the video serves as an informative and motivational guide for startup founders, emphasizing the importance of launching early, learning from each experience, and continuously improving their products to achieve success.`
  let temperature: number = 0.7
  let user_prompt = `Based on this video description, I want to generate JSON Object of ${section_count} keywords for Search Engine Optimization, and ${section_count} for table of contents, and ${section_count} sectionContent.
  Here are some more requirements for the content: ${requirements}
  Each sectionContent should be around 200 words in length, unless otherwise specified.
  An example JSON output would be for ${section_count} sections:
    {
    "seo": ["eBike", "Bike", "Bicycle", "Commuters", "Trees"],
    "tableOfContents" : ["Introduction", "Getting Started", "Basic Concepts", "Advanced Techniques", "Practical Applications"],
    "sectionContent": ["Being a good drummer is all about having a great sense of rhythm and being able to keep a steady beat. It's like being the heartbeat of the band - you set the pace and keep everyone in sync. A good drummer also knows when to take the lead and when to step back and let others shine.", "To be a successful drummer, you need to have dedication and a love for your craft. It takes a lot of practice to develop your skills, but if you stick with it and keep learning, you'll keep getting better and better.", "o why should you be excited about drumming? Because it's an incredibly fun and rewarding way to express yourself and connect with others through music. When you're grooving behind the kit, you get to be the driving force that makes people want to dance and sing along.", "Buddy Rich: Known for his incredible speed and technical skill, Rich is considered one of the greatest jazz drummers ever. Art Blakey: Blakey's powerful, polyrhythmic style helped define the sound of hard bop. Gene Krupa: Krupa was a pioneer of drum solos and a major influence on modern drumming.", "Remember, the exact setup can vary based on personal preference and playing style. Experiment to find what works best for you, and don't be afraid to make adjustments as you develop your skills. With your drum kit assembled, you're ready to start your drumming journey!"],
    }
  `;

  // if it is regenerate
  if (action === 'regenerate') {
    temperature = 0.7
    system_prompt = `This is the content separated into a prev_title and a prev_content. The prev_title is a subheading within the entire article, and the prev_content is the content below that subheading.
    {"prev_title": "${prev_title}", "prev_content": "${prev_content}"}
    `;
    user_prompt = `I want to regenerate the content given the following prompt: ${popoverPrompt}. \n\n You are to generate a JSON response and MUST adhere to the prompt. Here is an example response:
    {
    "new_title": "Qualities of Great Drummers",
    "new_content" : "Being a good drummer is all about having a great sense of rhythm and being able to keep a steady beat. It's like being the heartbeat of the band - you set the pace and keep everyone in sync. A good drummer also knows when to take the lead and when to step back and let others shine. It's not just about playing fast or doing fancy fills, but about serving the song and making the whole band sound their best.",
    }`
  }

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