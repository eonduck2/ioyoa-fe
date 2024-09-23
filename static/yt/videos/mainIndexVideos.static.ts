import part from "../part.static";
import chart from "../chart.static";
import snippet from "../core/snippet.static";
import contentDetails from "../details/contentDetails.static";
import status from "../status/status.static";
import mostPopular from "../core/mostPopular.static";
import { regions } from "../region/regionCode.static";
import type { TMainIndexVideos } from "~/types/static/yt/videos/mainIndexVideos.type";

export default {
  [part]: `${snippet},${contentDetails},${status}`,

  [chart]: mostPopular,

  [regions.regionCode]: regions.nation,
} as TMainIndexVideos;
