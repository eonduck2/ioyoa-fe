import part from "../part.static";
import chart from "../chart.static";
import snippet from "../core/snippet.static";
import contentDetails from "../details/contentDetails.static";
import mostPopular from "../core/mostPopular.static";
import { regions } from "../region/regionCode.static";
import maxResults from "../maximum/maxResults.static";
import statistics from "../statistics.static";
import { TTrendIndexVideos } from "../../../src/types/static/yt//videos/trendIndexVideos.type";

export default {
  [part]: `${snippet},${contentDetails},${statistics}`,

  [chart]: mostPopular,

  [regions.regionCode]: regions.nation,

  [maxResults]: "50",
} as TTrendIndexVideos;
