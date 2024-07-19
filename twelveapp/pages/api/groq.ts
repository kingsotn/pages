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
  let user_prompt = `section_count=3
    Based on this video description, I want to generate a JSON object with ${section_count} keywords for Search Engine Optimization, ${section_count} for table of contents, and ${section_count} sectionContent.
    Here are some more requirements for the content: ${requirements}
    Each of the strings in sectionContent should be at least 500 words in length, unless otherwise specified. Ensure each section is detailed and covers the topic comprehensively.
    Provide thorough and complete responses for each section to meet the length requirements.
    Here is an example JSON output:
    {
    "seo": ["eBike", "Bike", "Bicycle", "Commuters", "Trees"],
    "tableOfContents" : ["Introduction", "Getting Started", "Basic Concepts", "Advanced Techniques", "Practical Applications"],
    "sectionContent": ["Being a good drummer is all about having a great sense of rhythm and being able to keep a steady beat. It's like being the heartbeat of the band - you set the pace and keep everyone in sync. A good drummer also knows when to take the lead and when to step back and let others shine. It's not just about playing fast or doing fancy fills, but about serving the song and making the whole band sound their best.
      To be a successful drummer, you need to have dedication and a love for your craft. It takes a lot of practice to develop your skills, but if you stick with it and keep learning, you'll keep getting better and better. Being a team player is also key - you need to be able to work well with other musicians and communicate effectively.",
          "Here are some of the most common music styles and famous drummers to listen to in each style:
      Rock: Rock drumming is known for its powerful beats and driving rhythms. Some legendary rock drummers include:
      John Bonham (Led Zeppelin): Bonham's hard-hitting style helped define the sound of rock drumming.
      Neil Peart (Rush): Peart was a master of technical proficiency and innovative drumming.
      Keith Moon (The Who): Moon's wild, energetic playing was a key part of The Who's sound.
      Jazz: Jazz drumming is all about creativity, improvisation, and keeping the groove. Check out these jazz greats:
      Buddy Rich: Known for his incredible speed and technical skill, Rich is considered one of the greatest jazz drummers ever.
      Art Blakey: Blakey's powerful, polyrhythmic style helped define the sound of hard bop.
      Gene Krupa: Krupa was a pioneer of drum solos and a major influence on modern drumming.
      ",
          "Setting up your first drum kit can seem daunting, but with a little guidance it's a straightforward process. Here's a step-by-step guide to help you get your drums ready to rock:
      Start with the bass drum: Place the bass drum in the center of your setup and attach the bass drum pedal. Adjust the legs so the drum is stable and level.
      Add the snare drum: Position the snare drum between your legs, slightly to the left of the bass drum for right-handed players. Adjust the height so the top of the drum is about the same level as your belt buckle when seated.
      Set up the toms: Mount the rack toms on the bass drum, with the smaller tom on the left and the larger tom on the right. Place the floor tom to the right of the bass drum. Adjust the heights and angles so they're comfortable to reach.
      Install the hi-hat: Place the hi-hat stand to the left of the snare drum. The cymbals should be about the same height as the snare drum.
      ",
          "Learning to read drum notation is like learning a new language just for drummers. Instead of using symbols to represent notes like in standard sheet music, drum notation uses symbols to tell you which part of the drum set to hit and when. The five lines and four spaces of the musical staff act as a map, with each drum or cymbal having its own unique position. The bass drum is usually on the bottom, the snare in the",],
    }

    Be clear and concise in your return. Only include the json starting with { and ending with }
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