import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import envLoader from "~/modules/env/envLoader";
import fetcher from "~/modules/fetching/fetcher";
import ytApiUrlGenerator from "~/modules/url/api/ytApiUrlGenerator";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import { EnvList } from "~/shared/env/envList.static";
import requestTypes from "~/yt/apiRequestTypes/requestTypes.static";
import mainIndexVideos from "~/yt/videos/mainIndexVideos.static";
import httpMethod from "~/shared/http/methods/httpMethods.static";
import type { TRouteIndexVideoItem } from "~/types/route/index.type";
import mime from "mime";
import CircleMenu from "~/components/menus/circleMenu";
import DynamicMediaCard from "~/components/card/dynamicMediaCard";

export default component$(() => {
  const response = useSignal<TRouteIndexVideoItem[]>([]);
  const thumbnailUrls = useSignal<string[]>([]);
  const formAction = useSignal<string>("");

  useTask$(async () => {
    const res = await fetcher(
      urlGeneratorWithPort(envLoader(EnvList.PUBLIC_EP_MAIN)),
    );

    const first_server = await res.json();
    const first_server_route = first_server.route;
    const res_from_vid_srvr = await fetcher(
      urlGeneratorWithPort(first_server_route),
      {
        method: httpMethod.POST,
        body: JSON.stringify({
          url: ytApiUrlGenerator(requestTypes.videos, mainIndexVideos),
        }),
        headers: { "Content-Type": mime.getType("json") as string },
      },
    );
    formAction.value = first_server_route;

    const data = await res_from_vid_srvr.json();
    const items = data.items;

    thumbnailUrls.value = items
      .slice(0, 3)
      .map((item: any) => item.snippet.thumbnails.maxres.url);
    response.value = items;
  });

  return (
    <>
      <div
        class="flex h-screen w-screen flex-col items-center overflow-hidden"
        style="background: linear-gradient(180deg, #FE3E3E 0%, #982525 100%);"
      >
        <div class="flex h-3/4 w-3/4 items-center justify-center ">
          {/* DynamicMediaCard에 3개의 썸네일 전달 */}
          <DynamicMediaCard
            thumbnail0={thumbnailUrls.value[0]}
            thumbnail1={thumbnailUrls.value[1]}
            thumbnail2={thumbnailUrls.value[2]}
          />
        </div>
        <div>
          <CircleMenu />
        </div>
      </div>
    </>
  );
});
