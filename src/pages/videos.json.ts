import type { APIRoute } from 'astro';
import { getChannelVideos } from '../lib/youtube';

// Published at /videos.json. The next build reads it back so videos that
// have aged out of YouTube's 15-item feed stay on the site.
export const GET: APIRoute = async () => {
  const videos = await getChannelVideos();
  return new Response(JSON.stringify({ updated: new Date().toISOString(), videos }, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
