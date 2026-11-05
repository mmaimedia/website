/**
 * Pulls the MMAI Media LLC channel's uploads from YouTube at build time.
 *
 * YouTube's public feed has no API key, but it only lists the newest 15
 * uploads. To keep older videos on the site, each build also reads the list
 * the live site already published (/videos.json) and merges the two. Older
 * entries that are no longer in the feed are checked against YouTube's oEmbed
 * endpoint, so deleted or privated videos drop off.
 *
 * The deploy workflow rebuilds the site on a schedule, so new uploads appear
 * without anyone touching the repo.
 */

export const CHANNEL_ID = 'UCkg8lISDlk-P2Tf3_JZHkaQ';
export const CHANNEL_URL = 'https://www.youtube.com/@MMAIMEDIA';

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
// Override for local testing; defaults to the live site.
const PUBLISHED_LIST_URL = process.env.YOUTUBE_PUBLISHED_LIST_URL ?? 'https://mmai.media/videos.json';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  published: string; // ISO 8601
  isShort: boolean;
  url: string;
  thumbnail: string;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function tag(xml: string, name: string): string {
  const match = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return match ? decodeEntities(match[1].trim()) : '';
}

function parseFeed(xml: string): YouTubeVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  return entries.map((entry) => {
    const id = tag(entry, 'yt:videoId');
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? '';
    const isShort = link.includes('/shorts/');
    return {
      id,
      title: tag(entry, 'title'),
      description: tag(entry, 'media:description'),
      published: tag(entry, 'published'),
      isShort,
      url: isShort ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  });
}

async function fetchWithRetry(url: string, tries = 3): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'mmai-website-build' } });
      // 4xx is a definite answer (e.g. video deleted); only 5xx and network errors are retried.
      if (res.status < 500) return res;
      lastError = new Error(`${url} returned HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
  }
  throw lastError;
}

/** The list the live site published on its last build. Empty only on the very first deploy. */
async function fetchPublishedList(): Promise<YouTubeVideo[]> {
  const res = await fetchWithRetry(PUBLISHED_LIST_URL);
  if (res.status === 404) {
    console.warn('[youtube] No published videos.json yet; starting from the feed alone.');
    return [];
  }
  if (!res.ok) throw new Error(`Could not read ${PUBLISHED_LIST_URL}: HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data?.videos)) throw new Error(`${PUBLISHED_LIST_URL} has no videos array`);
  return data.videos;
}

/** True if YouTube still serves the video publicly. */
async function stillPublic(id: string): Promise<boolean> {
  const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${id}`,
  )}`;
  const res = await fetchWithRetry(url);
  return res.ok;
}

async function loadVideos(): Promise<YouTubeVideo[]> {
  // A failure here fails the build on purpose: the live site keeps its last
  // good list instead of deploying an empty or truncated one.
  const feedRes = await fetchWithRetry(FEED_URL);
  if (!feedRes.ok) throw new Error(`YouTube feed returned HTTP ${feedRes.status}`);
  const fromFeed = parseFeed(await feedRes.text());
  if (fromFeed.length === 0) throw new Error('YouTube feed returned no videos');

  const feedIds = new Set(fromFeed.map((v) => v.id));
  const older = (await fetchPublishedList()).filter((v) => v?.id && !feedIds.has(v.id));
  const checks = await Promise.all(older.map((v) => stillPublic(v.id)));
  const keptOlder = older.filter((_, i) => checks[i]);

  const all = [...fromFeed, ...keptOlder].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
  );
  console.log(
    `[youtube] ${all.length} videos (${fromFeed.length} from feed, ${keptOlder.length} carried over, ${
      older.length - keptOlder.length
    } removed)`,
  );
  return all;
}

let cache: Promise<YouTubeVideo[]> | undefined;

/** All public uploads, newest first. Fetched once per build. */
export function getChannelVideos(): Promise<YouTubeVideo[]> {
  cache ??= loadVideos();
  return cache;
}
