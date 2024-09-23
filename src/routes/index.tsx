import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import envLoader from "~/modules/env/envLoader";
import fetcher from "~/modules/fetching/fetcher";
import ytApiUrlGenerator from "~/modules/url/api/ytApiUrlGenerator";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import { EnvList } from "~/shared/env/envList.static";
import requestTypes from "~/yt/apiRequestTypes/requestTypes.static";
import mainIndexVideos from "~/yt/videos/mainIndexVideos.static";
import httpMethod from "~/shared/http/methods/httpMethods.static";
import mime from "mime";

interface Thumbnail {
  url: string;
}

interface Snippet {
  thumbnails: {
    high: Thumbnail;
  };
}

interface Video {
  snippet: Snippet;
}

interface Response {
  value: Video[];
}

export default component$(() => {
  const response = useSignal([]);

  useTask$(async () => {
    const res = await fetcher(
      urlGeneratorWithPort(envLoader(EnvList.PUBLIC_EP_MAIN)),
    );

    const first_server = await res.json();
    const res_from_vid_srvr = await fetcher(
      urlGeneratorWithPort(first_server.route),
      {
        method: httpMethod.POST,
        body: JSON.stringify({
          url: ytApiUrlGenerator(requestTypes.videos, mainIndexVideos),
        }),
        headers: { "Content-Type": mime.getType("json") as string },
      },
    );

    const data = await res_from_vid_srvr.json();
    response.value = data.items;
    // data.items[0].snippet.thumbnails.high.url;
    // console.log(typeof response.value);
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
            {response.value.map((value) => {
              return (
                <picture>
                  <source srcSet={value.snippet.thumbnails.high.url} />
                  <img
                    src={value.snippet.thumbnails.high.url}
                    alt={value.snippet.title}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </picture>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
});
