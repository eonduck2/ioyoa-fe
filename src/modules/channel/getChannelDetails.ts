import fetcher from "~/modules/fetching/fetcher";
import ytApiUrlGenerator from "~/modules/url/api/ytApiUrlGenerator";
import requestTypes from "~/yt/apiRequestTypes/requestTypes.static";
import mime from "mime";
import HttpMethod from "~/shared/http/methods/httpMethods.static";
import urlGeneratorWithPort from "../url/urlGeneratorWithPort";
import envLoader from "../env/envLoader";
import { EnvList } from "~/shared/env/envList.static";
import channelQuerySearcher from "../yt/channel/channelQuerySearcher";

export default async (channelId: string) => {
  try {
    const res = await fetcher(
      urlGeneratorWithPort(envLoader(EnvList.PUBLIC_EP_MAIN)),
      {
        method: HttpMethod.POST,
        body: JSON.stringify({ serverType: "channels" }),
        headers: { "Content-Type": mime.getType("json") as string },
      },
    );

    const first_server = await res.json();
    const first_server_route = first_server.route;

    const res_from_sec_srvr = await fetcher(
      urlGeneratorWithPort(first_server_route),
      {
        method: HttpMethod.POST,
        body: JSON.stringify({
          url: ytApiUrlGenerator(
            requestTypes.channels,
            channelQuerySearcher(channelId),
          ),
        }),
        headers: { "Content-Type": mime.getType("json") as string },
      },
    );

    const data = await res_from_sec_srvr.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch channel details:", error);
    return null;
  }
};
