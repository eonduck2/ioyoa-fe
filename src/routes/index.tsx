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
  const videoIds = useSignal<string[]>([]); // 비디오 ID를 저장할 배열
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
    console.log(data);

    thumbnailUrls.value = items
      .slice(0, 3)
      .map((item: any) => item.snippet.thumbnails.maxres.url);

    videoIds.value = items.slice(0, 3).map((item: any) => item.id); // 비디오 ID를 추출하여 저장

    response.value = items;
  });

  return (
    <>
      <div class="relative flex h-screen w-screen flex-col items-center overflow-hidden bg-purple-200">
        {/* left */}

        {/* <div class="absolute left-14 top-14">
          <img src="./public/flies.png" alt="" width="130" height="77" />
        </div>

        <div class="absolute bottom-1/2 left-64 ">
          <img src="./public/basketball.png" alt="" width="100" height="102" />
        </div>

        <div class="absolute  bottom-14 left-14">
          <img src="./public/smileCry.png" alt="" width="75" height="70" />
        </div> */}

        {/* right */}

        {/* <div class="absolute right-40 top-14">
          <img src="./public/smileKen.png" alt="" width="138" height="132" />
        </div>

        <div class="absolute bottom-28 right-8">
          <img src="./public/cactus.png" alt="" width="215" height="194" />
        </div> */}

        <div class="flex h-3/4 w-3/4 items-center justify-center ">
          {/* DynamicMediaCard에 3개의 썸네일과 비디오 ID 전달 */}
          <DynamicMediaCard
            thumbnail0={thumbnailUrls.value[0]}
            thumbnail1={thumbnailUrls.value[1]}
            thumbnail2={thumbnailUrls.value[2]}
            videoId0={videoIds.value[0]} // 첫 번째 비디오 ID
            videoId1={videoIds.value[1]} // 두 번째 비디오 ID
            videoId2={videoIds.value[2]} // 세 번째 비디오 ID
          />
        </div>
        <div>
          <CircleMenu />
        </div>
      </div>
    </>
  );
});
