import part from "../../../../static/yt/part.static";
import snippet from "../../../../static/yt/core/snippet.static";
import maxResults from "../../../../static/yt/maximum/maxResults.static";
import q from "../../../../static/yt/search/query/query.static";
import ytType from "../../../../static/yt/ytType.statics";
import pageToken from "../../../../static/yt/pageToken.static";

/**
 * @param search_query 검색어
 * @param type 검색 종류 (channel, video, playlist)
 * @param nextPageToken 다음 페이지 토큰 (옵션)
 */
export default (search_query: string, type: string, nextPageToken?: string) => {
  const params: Record<string, string> = {
    [part]: snippet,
    [q]: search_query,
    [ytType]: type,
    [maxResults]: "10",
  };

  if (nextPageToken) {
    params[pageToken] = nextPageToken;
  }

  return params;
};
