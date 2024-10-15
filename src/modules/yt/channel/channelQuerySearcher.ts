import part from "../../../../static/yt/part.static";
import statistics from "../../../../static/yt/statistics.static";
import snippet from "../../../../static/yt/core/snippet.static";
import pageToken from "../../../../static/yt/pageToken.static";
import contentDetails from "~/yt/details/contentDetails.static";
import id from "~/yt/ytId/id.static";
import status from "~/yt/status/status.static";
import maxResults from "~/yt/maximum/maxResults.static";

/**
 * @param search_query 채널 ID
 * @param nextPageToken 다음 페이지 토큰 (옵션)
 */
export default (channelId: string, nextPageToken?: string) => {
  const params: Record<string, string> = {
    [part]: `${contentDetails},${snippet},${statistics},${status}`,
    [id]: channelId,
    [maxResults]: "1",
  };

  if (nextPageToken) {
    params[pageToken] = nextPageToken;
  }

  return params;
};
