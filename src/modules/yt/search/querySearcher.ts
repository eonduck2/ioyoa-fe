import part from "../../../../static/yt/part.static";
import snippet from "../../../../static/yt/core/snippet.static";
import maxResults from "../../../../static/yt/maximum/maxResults.static";
import q from "../../../../static/yt/search/query/query.static";
import ytType from "../../../../static/yt/ytType.statics";

/**
 * @param search_query 검색어
 * @param type 검색 종류 (channel, video, playlist)
 */
export default (search_query: string, type: string) => {
  return {
    [part]: snippet,
    [q]: search_query,
    [ytType]: type,
    [maxResults]: "10",
  };
};
