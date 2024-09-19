import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import envLoader from "~/modules/env/envLoader";
import fetcher from "~/modules/fetching/fetcher";
import ytApiUrlGenerator from "~/modules/url/api/ytApiUrlGenerator";
import urlGeneratorWithPort from "~/modules/url/urlGeneratorWithPort";
import { envList } from "~/shared/env/envList.static";

export default component$(() => {
  const response = useSignal("");

  useTask$(async () => {
    const res = await fetcher(
      urlGeneratorWithPort(envLoader(envList.PUBLIC_EP_MAIN)),
    );

    const first_server = await res.json();
    const res_from_vid_srvr = await fetcher(
      urlGeneratorWithPort(first_server.route),
      {
        method: "POST",
        body: JSON.stringify({
          url: "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=10&regionCode=kr&key=AIzaSyAdAHdRseIVBU9_40L103fmzt4NPRF4GzU",
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res_from_vid_srvr.json();
    response.value = data.items[0].id;

    console.log(data);

    // ytApiUrlGenerator("videos", {
    //   part: "snippet,statistics",
    //   chart: "mostPopular",
    //   regionCode: "kr",
    //   maxResults: "5",
    // });
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
              frameBorder="15px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
});
