import Groq from "groq-sdk";

const TWELVE_KEY = process.env.TWELVE_KEY; // from .env.local
const BASE_URL = 'https://api.twelvelabs.io/v1.2';
const TYPES = ['topic', 'hashtag', 'title']; // default types
const VIDEO_ID = "66959fe83ca9a432304de1c8"
const GROQ_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_KEY });


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

export type SeoAndTableOfContents = {
  seo: string[],
  tableOfContents: string[],
}


if (!TWELVE_KEY) {
  throw new Error('API key is not defined in environment variables');
}

// stub for fetching the index if we aren't using a demo video
const fetchIndex = async (): Promise<string> => {
  return 'some_video_id';
};

// function to fetch gist
const fetchGist = async (videoUrl: string) => {

  // use demo video (VIDEO_ID) or not
  const videoId: string = (videoUrl === "https://www.youtube.com/watch?v=Nsx5RDVKZSk")
    ? VIDEO_ID
    : await fetchIndex();

  const url = `${BASE_URL}/gist`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'x-api-key': TWELVE_KEY as string, // explicitly cast to string
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ video_id: videoId, types: TYPES })
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error('error:', err);
    throw err;
  }
};

let fetchSummaryResponse: Summary;
// function to fetch summary
const fetchSummary = async (
  videoUrl: string,
  temperature: number = 0.7,
  type: string = 'summary'
) => {

  // use demo video (VIDEO_ID) or not
  const videoId: string = (videoUrl === "https://www.youtube.com/watch?v=Nsx5RDVKZSk")
    ? VIDEO_ID
    : await fetchIndex();

  const url = `${BASE_URL}/summarize`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'x-api-key': TWELVE_KEY as string, // explicitly cast to string
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ temperature, video_id: videoId, type })
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    fetchSummaryResponse = await res.json();
    return fetchSummaryResponse;
  } catch (err) {
    console.error('error:', err);
    throw err;
  }
};


// this is a groq request
const fetchSeoAndTableOfContents = async (
  videoUrl: string,
) => {

  // fail here
  if (videoUrl !== "https://www.youtube.com/watch?v=Nsx5RDVKZSk") throw new Error("Can't use this video... yet");

  const temperature: number = 0.5
  // const system_prompt = `Video Description: ${fetchSummaryResponse.summary}`
  const system_prompt = `Video Description: The video features a comprehensive discussion led by various prominent figures from Y Combinator, including Michael Seibel, Diana, Gustav, Tom, Harj, and Pete, focusing on the crucial topic of launching startup products. The content emphasizes the common fears and misconceptions that founders have about launching their products, particularly the false belief that a launch must be perfect and that a failed launch will have dire consequences. \nThe speakers stress the importance of launching early and often, arguing that the real value lies in the learning and feedback gained from each launch. They discuss how many founders, especially those with experience in large companies like Apple and Google, mistakenly believe that they need to spend extensive time and resources polishing their products before launching. The video debunks this myth, highlighting that for startups, an iterative approach to launching is far more effective, allowing them to learn from real-world feedback and make necessary improvements.\nMichael Seibel and Diana specifically address the dangers of \"pop culture knowledge\" and the unrealistic expectations it sets for startup founders. They illustrate that most successful companies had multiple launches before gaining traction, using examples like Airbnb, which launched three times before achieving success. The speakers also touch on the psychological barriers that prevent founders from launching, such as the fear of failure and rejection. They advocate for a mindset shift where learning and iteration are prioritized over perfection.\nThe video also covers practical advice on handling the aftermath of a launch, especially if it does not go as planned. Founders are encouraged to diagnose problems analytically, tweak their approaches, and re-launch rather than considering an initial failure as a definitive setback. The importance of targeting the right customers and learning to love rejection is also discussed, as these experiences help refine the product and business approach.\nTowards the end, the video provides motivational insights, encouraging founders to embrace the discomfort of feedback and criticism as part of the growth process. It concludes with a call to action, inviting viewers to explore Y Combinator's resources and support for launching their products and iterating based on customer feedback.\nOverall, the video serves as an informative and motivational guide for startup founders, emphasizing the importance of launching early, learning from each experience, and continuously improving their products to achieve success.`
  const user_prompt = `
    Based on this video description, I want to generate JSON Object of 5 keywords for Search Engine Optimization, and 5 for table of contents.
    An example JSON output would be:
    {
    "seo": ["eBike", "Bike", "Bicycle", "Commuters", "Trees"],
    "tableOfContents" : ["Introduction", "Getting Started", "Basic Concepts", "Advanced Techniques", "Practical Applications"],
    }
    `;

  console.log(groq.chat.completions.create({
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
  }))

  // return groq_response
};


export { fetchGist, fetchSummary, fetchSeoAndTableOfContents };






// const SeoAndTableOfContentsSchema = z.object({
//   seo: z.array(z.string()).nonempty(),
//   tableOfContents: z.array(z.string()).nonempty(),
// });

// export type SeoAndTableOfContents = z.infer<typeof SeoAndTableOfContentsSchema>;

// const fetchSeoAndTableOfContents = async (
//   videoUrl: string,
//   temperature: number = 0.2, // Lowered temperature for more deterministic output
// ): Promise<SeoAndTableOfContents> => {
//   const videoId: string = (videoUrl === "https://www.youtube.com/watch?v=Nsx5RDVKZSk")
//     ? VIDEO_ID
//     : await fetchIndex();

//   const url = `${BASE_URL}/seo_and_toc`;
//   const options = {
//     method: 'POST',
//     headers: {
//       accept: 'application/json',
//       'x-api-key': TWELVE_KEY as string,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ temperature, video_id: videoId, prompt_string })
//   };

//   try {
//     const res = await fetch(url, options);
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     const data = await res.json();

//     // Parse and validate the data
//     const validatedData = SeoAndTableOfContentsSchema.parse(data);

//     return validatedData;
//   } catch (err) {
//     console.error('Error:', err);

//     // If validation fails, return a default object that matches the type
//     return {
//       seo: ['Error'],
//       tableOfContents: ['Error occurred while fetching data'],
//     };
//   }
// };



//   list video
// https://docs.twelvelabs.io/reference/list-videos


// const fetch = require('node-fetch');

// const url = 'https://api.twelvelabs.io/v1.2/indexes/66959f4432c23a55e04b7775/videos?page=1&page_limit=2&sort_by=created_at&sort_option=desc&_id=66959fe83ca9a432304de1c8';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     'x-api-key': 'tlk_30ADA4E1H14KXS281XA8K2GVYTG3',
//     'Content-Type': 'application/json'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

// {
//     "data": [
//       {
//         "_id": "66959fe83ca9a432304de1c8",
//         "created_at": "2024-07-15T22:17:03Z",
//         "updated_at": "2024-07-15T22:17:12Z",
//         "indexed_at": "2024-07-15T22:28:59Z",
//         "metadata": {
//           "duration": 1098,
//           "engine_ids": [
//             "marengo2.6",
//             "pegasus1.1"
//           ],
//           "filename": "Why Startup Founders Should Launch Companies Sooner Than They Think",
//           "fps": 24,
//           "height": 480,
//           "size": 49177529,
//           "width": 854
//         }
//       }
//     ],
//     "page_info": {
//       "page": 1,
//       "limit_per_page": 2,
//       "total_page": 1,
//       "total_results": 1,
//       "total_duration": 1098
//     }
//   }



// this code gets the title, topics, hashtags
// https://docs.twelvelabs.io/reference/generate-gist


// summarize
// const fetch = require('node-fetch');

// const url = 'https://api.twelvelabs.io/v1.2/summarize';
// const options = {
//   method: 'POST',
//   headers: {
//     accept: 'application/json',
//     'x-api-key': 'tlk_30ADA4E1H14KXS281XA8K2GVYTG3',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     temperature: 0.7,
//     prompt: 'Generate SEO content',
//     video_id: '66959fe83ca9a432304de1c8',
//     type: 'summary'
//   })
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

// {
//     "id": "d19d3ac7-18c4-451b-ba13-4da82efefcdf",
//     "summary": "The video features a comprehensive discussion on the importance of launching products for startups, hosted by Michael Seibel, a partner at Y Combinator, alongside various guests including the CEO of Ginkgo Bioworks and founders from the biotech industry. The primary focus is on demystifying the launch process for new businesses and encouraging founders to embrace early and iterative launches rather than waiting for a perfect product.\nMichael Seibel and his guests emphasize that many founders delay launching due to an unrealistic comparison with large companies like Apple and Google, which have extensive resources and polished launch events. They argue that waiting too long to launch can lead startups to miss out on crucial early feedback and learning opportunities. The video underscores the notion that launching multiple times and learning from each attempt is more beneficial than aiming for a flawless initial launch.\nThe discussion highlights common fears among first-time founders, such as the fear of failure, criticism, and the concern that no one will use their product. The speakers debunk these fears by sharing real-life examples, including the story of Airbnb, which had to launch multiple times before gaining traction. They also stress the importance of filtering for the right customers who genuinely need the product and are willing to support its development.\nThe video further explores the psychological barriers founders face, suggesting that they often overestimate the importance of their launch in the eyes of the public. It is pointed out that most people are not early adopters and that a failed launch usually does not result in permanent damage. Instead, founders are encouraged to use early launches to identify and address problems, gather feedback, and iterate on their product.\nThe guests also discuss the value of community and peer pressure in motivating founders to launch. By being part of a batch of startups, founders can see their peers' progress, which creates a healthy pressure to move forward and launch. This communal environment helps overcome the inertia that comes from fear and perfectionism.\nThe video concludes with practical advice for founders: launch early, embrace feedback, iterate on your product, and don't be afraid of rejection. The speakers encourage founders to focus on building something that a small group of users love, rather than something mediocre for a larger audience. They highlight the importance of learning from each launch to improve the product continuously.\nOverall, the video serves as a motivational and educational resource for startup founders, providing insights and strategies to overcome common obstacles in the launch process. The emphasis on early and iterative launches, community support, and the importance of learning and adapting makes it a valuable guide for anyone looking to bring a new product to market."
//   }