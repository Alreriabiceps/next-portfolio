const MICROLINK_API = 'https://api.microlink.io/';

export const getSitePreviewImageUrl = (siteUrl: string) => {
  const params = new URLSearchParams({
    url: siteUrl,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    'viewport.width': '1280',
    'viewport.height': '800',
    'screenshot.type': 'jpeg',
  });

  return `${MICROLINK_API}?${params.toString()}`;
};

export const fetchSitePreviewImageUrl = async (siteUrl: string): Promise<string | null> => {
  const params = new URLSearchParams({
    url: siteUrl,
    screenshot: 'true',
    'viewport.width': '1280',
    'viewport.height': '800',
    'screenshot.type': 'jpeg',
  });

  const response = await fetch(`${MICROLINK_API}?${params.toString()}`);
  if (!response.ok) return null;

  const payload = await response.json();
  return payload?.data?.screenshot?.url ?? null;
};
