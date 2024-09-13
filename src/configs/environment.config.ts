import dotenv from 'dotenv';

dotenv.config();

/** GNews */
const gnewsApiKey = String(process.env.GNEWS_API_KEY);
const gnewsBaseUrl = 'https://gnews.io/api/v4';

export const env = {
    gnews: {
        apiKey: gnewsApiKey,
        baseUrl: gnewsBaseUrl,
    },
};
