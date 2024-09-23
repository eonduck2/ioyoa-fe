import part from "../part.static";
import chart from "../chart.static";
import snippet from "../core/snippet.static";
import contentDetails from "../details/contentDetails.static";
import mostPopular from "../core/mostPopular.static";
import { regions } from "../region/regionCode.static";
import maxResults from "../maximum/maxResults.static";
import type { TMainIndexVideos } from "~/types/static/yt/videos/mainIndexVideos.type";

export default {
  [part]: `${snippet},${contentDetails}`,

  [chart]: mostPopular,

  [regions.regionCode]: regions.nation,

  [maxResults]: "3",
} as TMainIndexVideos;
