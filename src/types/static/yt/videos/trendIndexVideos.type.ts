import TChart from "~/types/shared/yt/chart.type";
import TMaxResults from "~/types/shared/yt/maximum/maxResults.type";
import TPart from "~/types/shared/yt/part.type";
import TRegionCode from "~/types/shared/yt/region/regionCode.type";

export type TTrendIndexVideos = {
  part: TPart;
  chart: TChart;
  regionCode: TRegionCode;
  maxResults: TMaxResults;
};
