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
import InputWithBtn from "~/components/input/inputWithBtn";
import Select_underline from "~/components/select/select_underline";
import { categoryOptions } from "~/routes/index.static";
import { formHandler } from "~/types/modules/route/index/formHandler";

export default component$(() => {
  const response = useSignal<TRouteIndexVideoItem[]>([]);
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
    response.value = data.items;
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
          <form onSubmit$={(e) => formHandler(e, formAction.value)}>
            <Select_underline name="searchCategory" options={categoryOptions} />
            <InputWithBtn name="searchQuery" placeholder="Enter search term" />
          </form>
          <div class="flex h-full w-full items-center justify-center">
            {/* {response.value!.map((value) => {
              return (
                <picture key={value.id}>
                  <source srcset={value.snippet.thumbnails.high.url} />
                  <img
                    src={value.snippet.thumbnails.high.url}
                    alt={value.snippet.title}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </picture>
              );
            })} */}
          </div>
        </div>
      </div>
    </>
  );
});
