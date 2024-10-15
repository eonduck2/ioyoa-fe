import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import envLoader from "~/modules/env/envLoader";
import fetcher from "~/modules/fetching/fetcher";
import ytApiUrlGenerator from "~/modules/url/api/ytApiUrlGenerator";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import { EnvList } from "~/shared/env/envList.static";
import requestTypes from "~/yt/apiRequestTypes/requestTypes.static";
import mainIndexVideos from "~/yt/videos/mainIndexVideos.static";
import HttpMethod from "~/shared/http/methods/httpMethods.static";
import type { TRouteIndexVideoItem } from "~/types/route/index.type";
import mime from "mime";
import CircleMenu from "~/components/menus/circleMenu";
import DynamicMediaCard from "~/components/card/dynamicMediaCard";

export default component$(() => {
  const response = useSignal<TRouteIndexVideoItem[]>([]);
  const thumbnailUrls = useSignal<string[]>([]);
  const videoIds = useSignal<string[]>([]);
  const formAction = useSignal<string>("");

  useTask$(async () => {
    const serverType = "video";
    const res = await fetcher(
      urlGeneratorWithPort(envLoader(EnvList.PUBLIC_EP_MAIN)),
      {
        method: HttpMethod.POST,
        body: JSON.stringify({ serverType }),
        headers: { "Content-Type": mime.getType("json") as string },
      },
    );

    const first_server = await res.json();
    const first_server_route = first_server.route;
    formAction.value = first_server_route;

    const res_from_sec_srvr = await fetcher(
      urlGeneratorWithPort(first_server_route),
      {
        method: HttpMethod.POST,
        body: JSON.stringify({
          url: ytApiUrlGenerator(requestTypes.videos, mainIndexVideos),
        }),
        headers: { "Content-Type": mime.getType("json") as string },
      },
    );

    const data = await res_from_sec_srvr.json();

    const items = data.items;

    thumbnailUrls.value = items
      .slice(0, 3)
      .map((item: any) => item.snippet.thumbnails.maxres.url);

    videoIds.value = items.slice(0, 3).map((item: any) => item.id); // 비디오 ID를 추출하여 저장

    response.value = items;
  });

  return (
    <>
      <div class="relative flex h-screen w-screen flex-col items-center overflow-hidden bg-gradient-to-br from-blue-300 to-pink-300">
        <div class="flex h-3/4 w-3/4 items-center justify-center ">
          <DynamicMediaCard
            thumbnail0={thumbnailUrls.value[0]}
            thumbnail1={thumbnailUrls.value[1]}
            thumbnail2={thumbnailUrls.value[2]}
            videoId0={videoIds.value[0]}
            videoId1={videoIds.value[1]}
            videoId2={videoIds.value[2]}
          />
        </div>
        <div>
          <CircleMenu />
        </div>
      </div>
    </>
  );
});
