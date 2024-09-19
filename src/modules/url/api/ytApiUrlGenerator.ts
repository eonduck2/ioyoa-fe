import urlJoin from "url-join";
import envLoader from "~/modules/env/envLoader";

export default (apiType: string, params: Record<string, string>) => {
  const __YT_URL_FOR_JOIN = urlJoin(
    envLoader("PUBLIC_YT_MAIN_API_URL"),
    `${apiType}?`,
  );

  const __YT_API_KEY = envLoader("PUBLIC_YT_API_KEY");

  const queryParams = new URLSearchParams({
    part: params.part || "snippet,contentDetails",
    chart: params.chart || "mostPopular",
    regionCode: params.regionCode || "kr",
    maxResults: params.maxResults || "10",
    key: __YT_API_KEY,
  });

  return console.log(__YT_URL_FOR_JOIN + queryParams.toString());
};
