import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import envLoader from "~/modules/env/envLoader";
import fetcher from "~/modules/fetching/fetcher";
import ytApiUrlGenerator from "~/modules/url/api/ytApiUrlGenerator";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import { EnvList } from "~/shared/env/envList.static";
import requestTypes from "~/yt/apiRequestTypes/requestTypes.static";
import mainIndexVideosStatic from "~/yt/videos/mainIndexVideos.static";
import mainIndexVideos from "~/yt/videos/mainIndexVideos.static";

export default component$(() => {
  const response = useSignal("");

  useTask$(async () => {
    const res = await fetcher(
      urlGeneratorWithPort(envLoader(EnvList.PUBLIC_EP_MAIN)),
    );

    const first_server = await res.json();
    const res_from_vid_srvr = await fetcher(
      urlGeneratorWithPort(first_server.route),
      {
        method: "POST",
        body: JSON.stringify({
          url: ytApiUrlGenerator(requestTypes.videos, mainIndexVideos),
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res_from_vid_srvr.json();
    response.value = data.items[0].id;

    console.log(data.items[0].snippet);
    console.log(mainIndexVideosStatic);
    console.log(ytApiUrlGenerator(requestTypes.videos, mainIndexVideos));
  });

  return (
    <>
      <div class="flex h-full w-full items-center justify-center bg-green-500">
        <div
          style={{
            backgroundImage: "url('./bg-desktop.png')",
            width: "100vw",
            height: "100vh",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div class="flex h-full w-full items-center justify-center">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${response.value}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
});
