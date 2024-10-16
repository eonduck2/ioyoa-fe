// src/types/YouTubeVideoTypes.ts

export type TYouTubeVideoSnippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
    standard?: { url: string };
    maxres?: { url: string };
  };
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
};

export type TYouTubeVideoContentDetails = {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  regionRestriction: { allowed: string[] };
  contentRating: Record<string, unknown>;
  projection: string;
};

export type TYouTubeVideoStatistics = {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
};

export type TYouTubeVideo = {
  kind: string;
  etag: string;
  id: string;
  snippet: TYouTubeVideoSnippet;
  contentDetails: TYouTubeVideoContentDetails;
  statistics: TYouTubeVideoStatistics;
};

export type TPopularSearch = {
  Score: number;
  Member: string;
};
