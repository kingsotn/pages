const API_KEY = process.env.NEXT_PUBLIC_TWELVE_KEY; // from .env.local
console.log("API_KEY", API_KEY)
const BASE_URL = 'https://api.twelvelabs.io/v1.2';
const TYPES = ['topic', 'hashtag', 'title']; // default types
const VIDEO_ID = "66959fe83ca9a432304de1c8"

if (!API_KEY) {
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
      'x-api-key': API_KEY as string, // explicitly cast to string
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

// function to fetch summary
const fetchSummary = async (
  videoUrl: string,
  temperature: number = 0.7,
  prompt: string = 'Generate SEO content',
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
      'x-api-key': API_KEY as string, // explicitly cast to string
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ temperature, prompt, video_id: videoId, type })
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

export { fetchGist, fetchSummary };




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